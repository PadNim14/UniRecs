import './frontend/styles/App.css';
import React from 'react';
import { Login } from './frontend/components/Login';
import { Register } from './frontend/components/Register';
import Home from './frontend/components/Home';
import Navbar from './frontend/helper/Navbar';
import SampleData from './frontend/components/SampleData';
import LiberalArts from './frontend/components/LiberalArts';
import About from './frontend/components/About';
import { InitialQuiz } from './frontend/components/InitialQuiz';
import { AcademicTraitsQuiz } from './frontend/components/AcademicTraitsQuiz';
import { SubjectPreferences } from './frontend/components/SubjectPreferences';
import { EnvironInfo } from './frontend/components/EnvironInfo';
import { Opportunities } from './frontend/components/Opportunities';
import { PersonalInfo } from './frontend/components/PersonalInfo';
import { TranscriptInfo } from './frontend/components/TranscriptInfo';
import Results from './frontend/components/Results';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './frontend/components/ProtectedRoute';
import Profile from './frontend/components/Profile';
import UserResponses from './frontend/components/UserResponses';

function App() {

  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/sample_database' element={<SampleData />} />
            <Route path='/liberal_arts' element={<LiberalArts />} />
            <Route path='/about' element={<About />} />
            <Route path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path='/quiz'
              element={
                <ProtectedRoute>
                  <center>
                    <InitialQuiz />
                  </center>
                </ProtectedRoute>
              }
            />
            <Route path='/user_results'
              element={
                <ProtectedRoute>
                  <center>
                    <UserResponses />
                  </center>
                </ProtectedRoute>
              }
            />
            <Route path='/academic_traits'
              element={
                <ProtectedRoute>
                  <center>
                    <AcademicTraitsQuiz />
                  </center>
                </ProtectedRoute>
              }
            />
            <Route path='/subject_preferences'
              element={
                <ProtectedRoute>
                  <center>
                    <SubjectPreferences />
                  </center>
                </ProtectedRoute>
              }
            />
            <Route path='/environmental_information'
              element={<ProtectedRoute>
                <center>
                  <EnvironInfo />
                </center>
              </ProtectedRoute>
              }
            />
            <Route path='/opp_info'
              element={<ProtectedRoute>
                <center>
                  <Opportunities />
                </center>
              </ProtectedRoute>
              }
            />
            <Route path='/personal_info'
              element={<ProtectedRoute>
                <center>
                  <PersonalInfo />
                </center>
              </ProtectedRoute>
              }
            />

            <Route path='/transcript_info'
              element={<ProtectedRoute>
                <center>
                  <TranscriptInfo />
                </center>
              </ProtectedRoute>
              }
            />
            <Route path='/results'
              element={<ProtectedRoute>
                <center>
                  <Results />
                </center>
              </ProtectedRoute>
              }
            />

          </Routes>

        </Router>
      </AuthContextProvider>
    </div>

  );
}

export default App;
