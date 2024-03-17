import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { NavBar } from "../component/navbar";
import "../../styles/adminPage.css";


export const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState("");
  const [location, setLocation] = useState("");
  const [meetingPoint, setMeetingPoint] = useState("");
  const [hour, setHour] = useState("");
  const [link, setLink] = useState("");
  const [userLevel, setUserLevel] = useState(null)
  const [userToken, setUserToken] = useState("");


  const navigate = useNavigate();
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      navigate("/login");
      return;
    }
    setUserToken(userToken);
    fetch(`${process.env.BACKEND_URL}/api/userslevel`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setUserLevel(data.level);
      })
      .catch(error => {
        console.error('Error fetching user level:', error);
        navigate("/login");
      });
  }, [navigate]);
  useEffect(() => {
    const routeRequirement = "/api/users";
    const url = `${process.env.BACKEND_URL}${routeRequirement}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching users: ${error}`);
        setLoading(false);
      });
  }, []);
  const handlePromote = () => {
    const adminRouteRequirement = "/api/admin";
    const url = `${process.env.BACKEND_URL}${adminRouteRequirement}`;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: selectedEmail
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message || data.error);
        alert('User updated successfully!');
        return fetch(`${process.env.BACKEND_URL}/api/stripelink`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: selectedEmail,
            stripe_link_integration: link
          }),
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message || data.error);
        alert('Stripe link updated successfully!');
      })
      .catch(error => {
        console.error(`Error updating user or Stripe link: ${error}`);
      });
  };
  if (loading) {
    return <div>Loading...</div>;
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const adminRouteRequirement = "/api/event";
    const url = `${process.env.BACKEND_URL}${adminRouteRequirement}`;
    const eventData = {
      day: day,
      hour: hour,
      location: location,
      meeting_point: meetingPoint,
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        alert("Event created successfully");
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (userLevel !== 3) {
    return <div>Access denied. Only users with level 3 can access this page.</div>;
  }

  const handleEmailChange = (event) => {
    setSelectedEmail(event.target.value);
  };
  return (
    
    <div className="admin-page">
      <NavBar />
      <div className="admin-container">
      
        <h3 className="upgrade mt-4 ms-4 text-left">Upgrade user level</h3>
        <p className="text-muted d-flex justify-content-center ">Type a user email to promote for the next level, and insert Stripe Connect Link</p>
        <div className="infoblock pt-3 mx-5 px-5 d-flex justify-content-around">
          <div className="selector   ">
            <input
              type="email"
              className="btn btn-secondary dropdown-toggle"
              id="dropdownMenuButton"
              value={selectedEmail}
              onChange={handleEmailChange}
              placeholder="Select email"
            />
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {users.map(user => (
                <li key={user.email}>
                  <a className="dropdown-item" href="#" onClick={() => setSelectedEmail(user.email)}>
                    {user.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="link">
            <div className="input-group ms-2 ">
              <span className="input-group-text" id="inputGroup-sizing-default span-size">Link</span>
              <input type="text" className="form-control input-size" value={link} onChange={e => setLink(e.target.value)} />
            </div>
          </div>
          <div className="button ">
            <button onClick={handlePromote} className="btn btn-primary px-4 py-2">Promote</button>
          </div>
        </div>
        <div className='event-container'>
          <h3 className="Ev mt-4 ms-4 text-left">Create the next event</h3>

          <div className=" infoblock pt-3 mx-5 px-5 d-flex justify-content-around">
            <form onSubmit={handleSubmit}>
              <div className="input-group row justify-content-center mx-5">
                <div className="input-section col-6 grid gap-1 ">
                  <span className="input-group-text bg-transparent m-0 p-1 d-inline-flex align-items-center span-size" id="inputGroup-sizing-default"> Day:</span>
                  <input className="border m-0 p-1 input-size" type="date" value={day} onChange={e => setDay(e.target.value)} />
                </div>
                <div className="input-section col-6 grid gap-1">
                  <span className="input-group-text bg-transparent m-0 p-1 d-inline-flex align-items-center span-size" id="inputGroup-sizing-default"> Hour:</span>
                  <input className="border m-0 p-1 input-size" type="time" value={hour} onChange={e => setHour(e.target.value)} />
                </div>
                <div className="input-section col-6 grid gap-1">
                  <span className="input-group-text bg-transparent m-0 p-1 d-inline-flex align-items-center span-size" id="inputGroup-sizing-default"> Location:</span>
                  <input className="border m-0 p-1 input-size" type="text" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <div className="input-section col-6">
                  <span className="input-group-text bg-transparent m-0 p-1 d-inline-flex align-items-center span-size" id="inputGroup-sizing-default"> Meeting Point:</span>
                  <input className="border m-0 p-1 input-size" type="text" value={meetingPoint} onChange={e => setMeetingPoint(e.target.value)} />
                </div>
              </div>
            </form>
            <div className='submit mt-4'>
              <button onClick={handleSubmit} className="btn btn-success px-4 py-2">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <Link to="/userdata">
        <div class="d-flex justify-content-center mt-3">
          <button className=" return-button btn btn-success px-4 py-2">Return to User Page</button>
        </div>
      </Link>
    </div>
  );
};




