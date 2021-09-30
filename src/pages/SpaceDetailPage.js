import React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpaceDetail } from "../store/space/actions";
import {
  selectDetailsData,
  selectLoadingState,
} from "../store/space/selectors";

export default function SpaceDetailPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingState);
  const spaceDetail = useSelector(selectDetailsData);
  const { id } = useParams();

  useEffect(() => {
    console.log("am i running?");
    dispatch(fetchSpaceDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      {!spaceDetail ? (
        "Loading"
      ) : (
        <div>
          <div
            style={{
              backgroundColor: `${spaceDetail.backgroundColor}`,
              color: `${spaceDetail.color}`,
              padding: "1em",
            }}
          >
            <h1>{spaceDetail.title}</h1>
            <h5>{spaceDetail.description}</h5>
          </div>

          {spaceDetail.stories
            .sort((story1, story2) => {
              return story2.createdAt.localeCompare(story1.createdAt);
            })
            .map((story) => {
              return (
                <div
                  key={story.id}
                  style={{
                    border: `${spaceDetail.backgroundColor} solid 2px`,
                    margin: "1em",
                    padding: "1em",
                  }}
                >
                  <h6>{story.name}</h6>
                  <p>{story.content}</p>
                  <img
                    src={story.imageUrl}
                    alt={story.name}
                    style={{ width: "500px" }}
                  ></img>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
