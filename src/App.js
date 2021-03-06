import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import SpaceDetailPage from "./pages/SpaceDetailPage";
import Homepage from "./pages/Homepage";
import MySpace from "./pages/MySpacePage";
import StoryForm from "./components/StoryForm";
import EditStoryForm from "./components/EditStoryForm";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route path="/spaces/:id" component={SpaceDetailPage} />
        <Route exact path="/" component={Homepage} />
        <Route path="/mySpace/newStory" component={StoryForm} />
        <Route path="/mySpace/edit" component={EditStoryForm} />
        <Route path="/mySpace" component={MySpace} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
