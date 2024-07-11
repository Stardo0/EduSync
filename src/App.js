import './App.css';
import React, { useState, useEffect } from 'react';
import HomeBlack from './Icons/Home.svg';
import HomeBlue from './Icons/HomeBlue.svg';
import PlannerBlack from './Icons/Planner.svg';
import PlannerBlue from './Icons/PlannerBlue.svg';
import Logout from './Icons/Logout.svg';
import Settings from './Icons/Settings.svg';
import UserIcon from './Imgs/User.svg';
import Seartch from './Icons/Seartch.svg';
import Brain from './Imgs/brain.png';
import Back from './Icons/back.svg';
import LoginPic from './Imgs/Schedule.svg';
import EmailIcon from './Icons/envelope.svg';
import PasswordIcon from './Icons/key.svg';
import GoogleIcon from './Icons/google_logo-google_icongoogle-512.webp';
// Import Firebase services using the new modular syntax
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getDatabase, ref, get, onValue } from 'firebase/database';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const MathRenderer = ({ children }) => {
  useEffect(() => {
    const elements = document.querySelectorAll('.math');

    elements.forEach((element) => {
      const text = element.innerText;
      const html = katex.renderToString(text, {
        throwOnError: false
      });

      element.innerHTML = html;
    });
  }, []);

  return <div>{children}</div>;
};





// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0wHJnHD5yf1lvWHvwOwHjuzqqPPqr4lY",
  authDomain: "edusync1-3af45.firebaseapp.com",
  databaseURL: "https://edusync1-3af45-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "edusync1-3af45",
  storageBucket: "edusync1-3af45.appspot.com",
  messagingSenderId: "293958266884",
  appId: "1:293958266884:web:5e90b1f5e8bea850e80551",
  measurementId: "G-RX6R0VD61T"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); // Correctly use getAuth with the Firebase app instance
const db = getFirestore(app); // Correctly use getFirestore with the Firebase app instance
const provider = new GoogleAuthProvider();
// Continue with your code, now using `auth` for authentication related operations




function TopBar({ setOpenPage, openPage, Name, Email, UserImg, selectedOption, setSelectedOption }) {
  const [autocompleteList, setAutocompleteList] = useState([]);

  useEffect(() => {
    get(ref(database, 'subjects'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const list = [];
          snapshot.forEach((childSnapshot) => {
            const label = childSnapshot.key;
            list.push({ label });
          });
          setAutocompleteList(list);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log("Error getting subjects:", error);
      });
  }, []);

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedOption(newValue);
  };

  useEffect(() => {
    console.log(selectedOption?.label);
    if (selectedOption && selectedOption.label) {
      setOpenPage("Subject");
    }
  }, [selectedOption]);

  return (
    <div className="topbar">
      <div className='SeartchBar'>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={autocompleteList}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          onChange={handleAutocompleteChange}
          hidelabel
          sx={{
            '& .MuiInputBase-root': {
              height: '33px',
              borderRadius: '10px',
            },
            '& .MuiInputBase-input': {
              padding: '0px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              top: -4,
            },
            '& .MuiAutocomplete-inputRoot': {
              padding: '3px',
            },
            width: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          renderInput={(params) => (
            <TextField 
              {...params}
              placeholder="Search"
              sx={{
                marginBottom: '0.5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}
        />
      </div>
    </div>
  );
}


//Side Bar

function SideBar({ setOpenPage, openPage, Name, Email, UserImg, setSelectedOption, selectedOption }) {

  return (
    <div className="SideBar">
      <div className="container">
        <div className='Top'>
          <div className='Title' onClick={() => setOpenPage("Home")}>
            EduSync
          </div>
          <div className='MenuButtons'>
            <MainMenuElement 
              key={"Home"}
              title={"Home"} 
              img={openPage === "Home" ? HomeBlue : HomeBlack} 
              openPage={openPage} 
              setOpenPage={setOpenPage} 
            />
            <MainMenuElement 
              key={"Planner"}
              title={"Planner"} 
              img={openPage === "Planner" ? PlannerBlue : PlannerBlack} 
              openPage={openPage} 
              setOpenPage={setOpenPage} 
            />
          </div>
        </div>
        <div className='Bottom'>
          <UserData Name={Name} Email={Email} UserImg={UserImg}/>
          <div className='SecondaryMenu'>
            <SecondaryMenuElement title={'Settings'} img={Settings} setOpenPage={setOpenPage} openPage={openPage}/>
            <SecondaryMenuElement title={'Logout'} img={Logout} setOpenPage={setOpenPage} openPage={openPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

function UserData (props) {
  //set User Data

  return (
    <div className='UserData'>
      <div className='UserImage'>
        <img src={props.UserImg || UserIcon} alt="User Icon"/>
      </div>
      <div className='UserDataInfo'>
        <div className='Name'>{props.Name}</div>
        <div className='Email'>{props.Email}</div>
      </div>
    </div>
  );
}

function SecondaryMenuElement (props, onClick) {
  const setOpenPage = props.setOpenPage;
  return (
    <div className='SecondaryMenuElement' onClick={() => {
      if (props.title === 'Settings') {
        setOpenPage(props.title);
        localStorage.setItem('openPage', props.title);
      } else if (props.title === 'Logout') {
        setOpenPage('Login');
        localStorage.setItem('openPage', 'Login');
        auth.signOut()
              .then(() => {
                setOpenPage('Login');
              })
              .catch((error) => {
                // Display error message if logout fails
                alert(error.message);
              });
      }
    }}>
      <img src={props.img} alt="Icon"/>
      <div>{props.title}</div>
    </div>
  );
}

function MainMenuElement ({title, img, openPage, setOpenPage}) {
  return (
    <div className={`MainMenuElement`} id={openPage === title ? 'blue' : 'white'} onClick={() => {
      setOpenPage(title);
    }}>
      <img src={img}  alt="Icon"/>
      <div>{title}</div>
    </div>
  );
}




//Menu
function Menu({openPage, setOpenPage, Name, Email, UserImg}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (!selectedOption || !selectedOption.label) {
      setOpenPage("Home");
      setContent(null);
    } else {
      get(ref(database, 'subjects/' + selectedOption.label + '/content'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            // Daten erfolgreich abgerufen
            setContent(snapshot.val());
          } else {
            console.log("Keine Daten verfügbar");
            setContent(null);
          }
        })
        .catch((error) => {
          console.error("Fehler beim Abrufen der Daten:", error);
          setContent(null);
        });
    }
  }, [selectedOption]);


  return (
    <>
      <TopBar setOpenPage={setOpenPage} openPage={openPage} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
        <div className='Menu'>
          <SideBar setOpenPage={setOpenPage} openPage={openPage} Name={Name} Email={Email} UserImg={UserImg} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
          <Content setOpenPage={setOpenPage} openPage={openPage} Name={Name} Email={Email} UserImg={UserImg} selectedOption={selectedOption} setSelectedOption={setSelectedOption} content={content} setContent={setContent}/>
        </div>
    </>
  );
}
 


function HomeContent({ Name }) {
  return (
    <div className='HomeContent'>
      <div className='Intro'>
        <div className='Text'>
          <div className='Title'>Good to see you again {Name} 🖐</div>
          <div className='SubTitle'>You have [Number-of-tests] tests coming up next week, so it's important to begin studying as soon as possible.</div>
        </div>
        <div className='Image'>
          <img src={Brain} alt='Img'/>
        </div>
      </div>
    </div>
  );
}

function PlannerContent(props) {
  return (
    <div className='PlannerContent'>
      <h1>Planner</h1>
    </div>
  );

}

function SubjectContent({ selectedOption, setOpenPage, openPage, content, setContent }) {
  if (!selectedOption || !selectedOption.label) {
    setOpenPage("Home");
    return null;
  }
  return (
    <>
    <div className='SubjectContent'>
      <div className='ButtonContainer'>
        <div className='backButtom' onClick={() => setOpenPage("Home")}><img src={Back} alt="Icon" width='15px'></img>Back</div>
      </div>
      <div className='container'>
        <h1 className='title'>{selectedOption.label}</h1>
          <div className='text'>
            {/* Zeige nur den Wert von "TEst" als HTML an, wenn content ein Objekt ist */}
            {content && typeof content === 'object' && content.HTML ? (
              <div dangerouslySetInnerHTML={{ __html: content.HTML }} />
            ) : (
              content === null ? <div>Error fetching data | Sorry 😕</div> : <pre>{JSON.stringify(content, null, 2)}</pre>
            )}
          </div>
      </div>
    </div>
    </>
  );
}


function Content({ setOpenPage, openPage, Name, Email, UserImg, selectedOption, content, setContent }) { 
  return (
    <div className='Content'>
      {openPage === 'Home' && <HomeContent setOpenPage={setOpenPage} openPage={openPage} Name={Name} Email={Email} UserImg={UserImg}/>}
      {openPage === 'Planner' && <PlannerContent setOpenPage={setOpenPage} openPage={openPage} Name={Name} Email={Email} UserImg={UserImg}/>}
      {openPage === 'Subject' && <SubjectContent setOpenPage={setOpenPage} openPage={openPage} Name={Name} Email={Email} UserImg={UserImg} selectedOption={selectedOption} content={content} setContent={setContent}/>}
    </div>
  );
}

function Login(setOpenPage, setUser) {
  return (
    <div className='Login'>
      <div className='Left'>
        <div className='Title'>EduSync</div>
        <img src={LoginPic} alt='Img'></img>
      </div>
      <div className='Right'>
        <div className='Text'>
          <div className='Title'>Login</div>
          <div className='SubTitle'>Enter credentials to login</div>
        </div>
        <div className='Form'>
          <div className='Email'>
            <div className='TitleElement'>
              <img src={EmailIcon} alt='Icon'/>
              <div className='Titel'>Email</div>
            </div>
            <input type='text' placeholder='max.mustermann@gmail.com'/>
          </div>
          <div className='Password'>
            <div className='TitleElement'>
              <img src={PasswordIcon} alt='Icon'/>
              <div className='Titel'>Password</div>
            </div>
            <input type='password' placeholder='******'/>
          </div>
          <div className='Options'>
            <div className='n</div>oPass'>Email Login ?</div>
            <div className='ForgotPassword'>Forgot Password?</div>
          </div>
          <div className='LoginButton' onClick={() => {
            // Add your login logic here
            const email = document.querySelector('.Email input').value;
            const password = document.querySelector('.Password input').value;
            // Perform login operation using email and password
            auth.signInWithEmailAndPassword(email, password)
            .then(() => {
              setOpenPage('Home');
              setUser(auth.currentUser);
            })
            .catch((error) => {
              // Display error message if login fails
              alert(error.message);
            });
          }}>
            Login
          </div>
          <div className='line'>
            <div className='line1'></div>
            <div className='or'>or</div>
            <div className='line2'></div>
          </div>
          <div className='googleLogin' onClick={() => {
            signInWithPopup(auth, provider)
            .then(() => {
            })
            .catch((error) => {
              // Display error message if login fails
              alert(error.message);
            });
          }}>
            <div className='SingInGoogle'><img src={GoogleIcon} alt='Icon'/></div>
          </div>
          <div className='SignUp'>
            <div>Dont have an account? <span >Sign Up</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

//App
function App(props) {
  const [openPage, setOpenPage] = useState('Home');
  const [user, setUser] = useState(null);
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setName(user.displayName);
        setEmail(user.email);
        setOpenPage('Home')
      } else {
        setUser(null);
        setName('');
        setEmail('');
        setOpenPage('Login')
      }
    });
    return () => unsubscribe();
  }, []);
  const UserImg = user ? user.photoURL : '';

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {user !== null ? (
        <Menu setOpenPage={setOpenPage} openPage={openPage} Name={Name} Email={Email} UserImg={UserImg} />
      ) : (
        <Login setOpenPage={setOpenPage} openPage={openPage} setUser={setUser} />
      )}
    </div>
  );
}



export default App;
