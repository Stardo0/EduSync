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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ref, get, onValue } from 'firebase/database';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import Planner from './Pages/Planner/Planner';
import Editor from './Pages/SubjectEditor/editor';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase } from 'firebase/database';

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
const auth = getAuth(app); 
const db = getFirestore(app); 
const provider = new GoogleAuthProvider();


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
function Menu({openPage, setOpenPage, Name, Email, UserImg, Uid}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [content, setContent] = useState(null);
  const [imgURL, setImgURL] = useState(null); // Neuer Zustand für imgURL
  const [edit, setedit] = useState(false);

  useEffect(() => {
    if (!selectedOption || !selectedOption.label) {
      setOpenPage("Home");
      setContent(null);
      setImgURL(null); // imgURL zurücksetzen
    } else {
      get(ref(database, 'subjects/' + selectedOption.label + '/content'))
        .then((snapshot) => {
          if (snapshot.exists()) {
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

      // Abrufen der imgURL
      get(ref(database, 'subjects/' + selectedOption.label + '/ImgURL'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setImgURL(snapshot.val());
          } else {
            console.log("Keine imgURL verfügbar");
            setImgURL(null);
          }
        })
        .catch((error) => {
          console.error("Fehler beim Abrufen der imgURL:", error);
          setImgURL(null);
        });
    }
  }, [selectedOption]);


  return (
    <>
      <TopBar setOpenPage={setOpenPage} openPage={openPage} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
        <div className='Menu'>
          <SideBar setOpenPage={setOpenPage} openPage={openPage} Name={Name} Email={Email} UserImg={UserImg} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
          <Content setOpenPage={setOpenPage} openPage={openPage} Name={Name} Email={Email} UserImg={UserImg} selectedOption={selectedOption} setSelectedOption={setSelectedOption} content={content} setContent={setContent} Uid={Uid} imgURL={imgURL} edit={edit} setedit={setedit}/>
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

function SubjectContent({ selectedOption, setOpenPage, openPage, content, setContent, imgURL, edit, setedit }) {
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
          <div className='text'>
            <h1 className='title'>{selectedOption.label}</h1>
            <div className='text'>
              {content && typeof content === 'object' && content.HTML ? (
                <>
                  {edit ? (
                    <div className='editor-container'>
                      <Editor initialContent={content.HTML} />
                      <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={() => setedit(false)}>End editing</Button>
                      </Stack>
                    </div>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: content.HTML }} />
                  )}
                </>
              ) : (
                content === null ? <div>Error fetching data | Sorry 😕</div> : <pre>{JSON.stringify(content, null, 2)}</pre>
              )}
            </div>
          </div>

          <div className='SideMenu'>
            <img src={imgURL || 'data:image/png;base64,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'}></img>
            <div className='button'>Quiz</div>
            <div className='button-small' ><svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticky-note"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v4a2 2 0 0 0 2 2h4"/></svg>Worksheets</div>
            <div className='button-small' onClick={() => setedit(!edit)} ><svg width="17px" height="17px" viewBox="0 0 24 24" stroke-width="1.3" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#000000" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg>{edit ? 'End editing' : 'Edit'}</div>
          </div>
          
      </div>
    </div>
    </>
  );
}


function Content({ setOpenPage, openPage, Name, Email, UserImg, selectedOption, content, setContent, Uid, imgURL, edit, setedit }) { 

  


  return (
    <div className='Content'>
      {openPage === 'Home' && <HomeContent setOpenPage={setOpenPage} openPage={openPage} Name={Name} Email={Email} UserImg={UserImg}/>}
      {openPage === 'Subject' && <SubjectContent setOpenPage={setOpenPage} openPage={openPage} Name={Name} Email={Email} UserImg={UserImg} selectedOption={selectedOption} content={content} setContent={setContent} imgURL={imgURL} edit={edit} setedit={setedit}/>}
      {openPage === 'Planner' && <Planner setOpenPage={setOpenPage} openPage={openPage} Name={Name} Email={Email} UserImg={UserImg} Uid={Uid}/>}
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
            <div className='noPass'>Email Login ?</div>
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
  const [Uid , setUid] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setName(user.displayName);
        setEmail(user.email);
        setUid(user.uid);
        setOpenPage('Home')
      } else {
        setUser(null);
        setName('');
        setEmail('');
        setUid('');
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
        <Menu setOpenPage={setOpenPage} openPage={openPage} Name={Name} Email={Email} UserImg={UserImg} Uid={Uid} />
      ) : (
        <Login setOpenPage={setOpenPage} openPage={openPage} setUser={setUser} />
      )}
    </div>
  );
}



export default App;
