import './About.scss';
import { ReactElement } from 'react';

import ProfileImg from '../../assets/images/profile.jpeg';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext'

const About = (): ReactElement => {
    const navigate = useNavigate()
    const { user } = useAuthValue()

    const handleRedirect = () => {
        navigate('/posts/create')
    }

    return (
        <div className="About">
            <div className="container">
                <main>
                    <h1>About My<span className="posts-title">Posts</span></h1>
                    <p>This project was developed by <a href="https://vertocode.com">vertocode</a>, leveraging React for the frontend and Firebase for the backend.</p>
                    <p>The primary objective of this project is to provide a platform where individuals can easily create and share blog posts. Unlike conventional websites, MyPosts emphasizes a streamlined approach to showcasing profiles through a simple list of posts.</p>
                    <p>Personally, as a developer, I initially created my own blog using custom code. However, I questioned, "Should one need to be a programmer to have a blog?" This pondering led to the inception of MyPosts, aiming to simplify the process for everyone.</p>
                    <p>With MyPosts, anyone can effortlessly create and share posts with recruiters, colleagues, and friends. While there are other platforms for socializing, MyPosts stands out with its exclusive focus on posts!</p>
                    <p>If you have any constructive feedback, please feel free to reach out! You can contact me via email or LinkedIn.</p>
                    <p>Thank you for taking the time to read about MyPosts!</p>
                </main>


                <aside className="profile-image-container">
                    <img src={ ProfileImg } alt="profile.jpeg"/>
                    <h3>Everton Vanoni</h3>
                    <h4>Creator of My<span className="posts-about">Posts</span> </h4>
                    <div className="social-media">
                        <a href="https://www.linkedin.com/in/evertonvanoni/" target="_blank" rel="noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="mailto:evertonvanoni@gmail.com" target="_blank" rel="noreferrer">
                            <i className="fa fa-envelope"></i>
                        </a>
                        <a href="https://vertocode.com" target="_blank" rel="noreferrer">
                            <i className="fa fa-blog"></i>
                        </a>
                        <a href="https://github.com/vertocode" target="_blank" rel="noreferrer">
                            <i className="fa fa-github"></i>
                        </a>
                        <a href="https://gitlab.com/vertocode" target="_blank" rel="noreferrer">
                            <i className="fa fa-gitlab"></i>
                        </a>
                    </div>
                </aside>
            </div>

            {
                user && (
                    <footer>
                        <h2>Start build a new post to share with friends – I bet they'll like it!</h2>
                        <Button onClick={ handleRedirect } variant="contained" color="primary">New Post</Button>
                    </footer>
                )
            }
        </div>
    )
}

export default About;
