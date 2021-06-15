import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Home from "./components/Home";
import ApplicationViews from "./components/ApplicationViews";
import { CustomerProvider } from "./providers/CustomerProvider";
import Header from "./components/Header";
import { JobProvider } from "./providers/JobProvider";
import { AddressProvider } from "./providers/AddressProvider";
import { NoteProvider } from "./providers/NoteProvider";
import { WorkRecordProvider } from "./providers/WorkRecordProvider";
import { WorkDayProvider } from "./providers/WorkDayProvider";
import { FleetProvider } from "./providers/FleetProvider";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <JobProvider>
          <NoteProvider>
            <WorkRecordProvider>
              <CustomerProvider>
                <AddressProvider>
                  <FleetProvider>
                    <WorkDayProvider>
                      <Header />
                      <ApplicationViews />
                    </WorkDayProvider>
                  </FleetProvider>
                </AddressProvider>
              </CustomerProvider>
            </WorkRecordProvider>
          </NoteProvider>
        </JobProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
