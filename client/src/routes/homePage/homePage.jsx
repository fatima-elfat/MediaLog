import "./homePage.scss";
import BG from "../../assets/asset09.png"

function HomePage() {
  const handleGetStarted = () => {
    // TODO: Navigate to registration or main app
    console.log("Get Started clicked");
  };

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">A Personal Media Consumption Tracker</h1>
          <p>
          MediaLog is a personal media consumption tracker that helps you keep track of your favorite movies, TV shows, books, and video games. It's a great way to stay organized and discover new content based on your interests.
          </p>
                   <button className="startButton" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
      <div className="imgContainer">
        <img src={BG} alt="MediaLog application interface showing media tracking features" />      </div>
    </div>
  );
}

export default HomePage;
