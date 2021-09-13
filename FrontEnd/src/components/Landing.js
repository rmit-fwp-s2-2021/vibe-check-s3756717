/* LANDING - Basic landing page for website information */

import './styles/Landing.css';
import landingPic from './addons/landingPic.png';
import Footer from './Footer';
import {
    Link
} from "react-router-dom";

export default function Landing(){
    return(
        <div className = "landingWrapper">
            <div className = "dashTop">
                <Link to = "/" style={{ textDecoration: 'none', color: 'white' }} className = "dashHead">Vibe Check</Link>
                <div className = "landingBtns">
                    <Link to = "/signIn" style={{ textDecoration: 'none' }} className = "signIn">Sign In</Link>
                    <Link to = "/signUp" style={{ textDecoration: 'none' }} className = "signUp signUpHover">Sign Up</Link>
                </div>
            </div>
            <div className = "landingContent">
                <div className = "landingMainQuote">Times haven't been easy, But your mates make it better.</div>
                <img className = "landingImg" src = {landingPic} alt = "landing page"></img>
            </div>
            <div className = "landingAbout">
                <div className = "landingQuote">So, Who are we?</div>
                <div className = "aboutDesc">
                Times haven't been easy with everything that has been happening around the world.
                Not being able to see your mates is just adding insult to injury, so we thought of
                doing something about it. <br></br><br></br>
                
                Introducing Vibe Check, your one one stop hub to see what your
                uni mates are upto. 
                <br></br><br></br>

                Since the vibes can get quite boring being stuck at home, join in to enjoy
                a major vibe boost and stay up to date with all your friends from uni, and make
                sure to let them know what you're upto as well!<br></br><br></br>

                We at Vibe Check want to make sure you're having the best time possible, and 
                are here to brighten up your day, at least a little bit! <br></br><br></br>
                
                Happy vibing! 



                </div>
            </div>

            <div className = "landingAbout">
                <div className = "landingQuote">How to?</div>
                <div className = "aboutDesc">
                To enjoy our Vibe Check Services, you first need to make an account with us.<br></br>
                To do this, just click on the "Sign Up" button, on the top right corner of the page and fill in your details, along
                with a dashing picture of yourself and click the Sign Up button to get on board!. <br></br><br></br>

                If you already made an account, Congratulations! You're just one step away from having your vibes majorly boosted! <br></br>
                Simply click on the "Log In" button on the top right corner of the page, and enter the E-mail you used to sign up
                and your Vibe Check Password to enjoy all our Vibe Check Services!<br></br><br></br>

                Having logged in, you'll be landing straight onto your dashboard where you can see all your posts.<br></br><br></br>

                On the left side of the screen, you'll find your navigation bar, which you can use to navigate to different parts of the 
                website, where you can choose to jump straight in and make your own post or go and fine tune your account a bit more, if you're
                not too happy with it. <br></br><br></br>

                Making a post is simple. Simply type in whatever you want your mates to know and better yet, why not add a picture to go along with it?<br></br>
                Once you're done, just simply click the button below to see it up on your feed!<br></br><br></br>

                If you want to view your account and want to change anything, just simply click on the "Profile" tab on the side bar and you'll
                be able to see your profile picture, along with your account details as well. <br></br>
                Not happy with how others see you on VC? No worries, changing your details is only a few clicks away! Just simply fill in the details
                you want to change and double-click the button and you're good to go! <br></br><br></br>

                There's also an option to delete your account on the profile page, but we really do advise against it, since it would make us sad
                to see you leave :( <br></br><br></br>

                Happy Vibing!



                </div>
            </div>

            <Footer/>
        </div>
    );
}