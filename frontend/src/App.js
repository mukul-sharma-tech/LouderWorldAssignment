// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from "react";

// function App() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [email, setEmail] = useState("");
//   const [sending, setSending] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/events")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch events");
//         return res.json();
//       })
//       .then((data) => {
//         setEvents(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   const openModal = (event) => {
//     setSelectedEvent(event);
//     setEmail("");
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) return alert("Please enter your email.");
//     setSending(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/optin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, eventId: selectedEvent._id }),
//       });
//       if (!res.ok) throw new Error("Failed to save email");
//       setShowModal(false);
//       // Redirect after successful opt-in
//       window.open(selectedEvent.link, "_blank");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setSending(false);
//     }
//   };

//   if (loading)
//     return (
//       <p className="text-center mt-10 text-gray-600 text-lg font-medium">
//         Loading events...
//       </p>
//     );

//   if (error)
//     return (
//       <p className="text-center mt-10 text-red-600 text-lg font-medium">
//         Error: {error}
//       </p>
//     );

//   return (
//     <div className="max-w-3xl mx-auto p-4 font-sans">
//       <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
//         Upcoming Events
//       </h1>

//       {events.length === 0 ? (
//         <p className="text-center text-gray-500">No events found.</p>
//       ) : (
//         <ul className="space-y-6">
//           {events.map(({ _id, title, date, location, link }) => (
//             <li
//               key={_id}
//               className="border rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300"
//             >
//               <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
//               <p className="mt-1 text-gray-700">
//                 <span className="font-semibold">Date:</span> {date}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-semibold">Location:</span> {location}
//               </p>
//               <button
//                 onClick={() => openModal({ _id, title, link })}
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//               >
//                 GET TICKETS
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Get Tickets for {selectedEvent.title}</h2>
//             <form onSubmit={handleSubmit}>
//               <label className="block mb-2 font-semibold" htmlFor="email">
//                 Enter your email:
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
//                 placeholder="you@example.com"
//               />
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
//                   disabled={sending}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   disabled={sending}
//                 >
//                   {sending ? "Sending..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



// import React, { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [email, setEmail] = useState("");
//   const [sending, setSending] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/events")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch events");
//         return res.json();
//       })
//       .then((data) => {
//         setEvents(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   const openModal = (event) => {
//     setSelectedEvent(event);
//     setEmail("");
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) return alert("Please enter your email.");
//     setSending(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/optin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, eventId: selectedEvent._id }),
//       });
//       if (!res.ok) throw new Error("Failed to save email");
//       setShowModal(false);
//       window.open(selectedEvent.link, "_blank");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setSending(false);
//     }
//   };

//   if (loading)
//     return <p className="loading-message">Loading events...</p>;

//   if (error)
//     return <p className="error-message">Error: {error}</p>;

//   return (
//     <div className="app-container">
//       <h1 className="app-header">Upcoming Events</h1>

//       {events.length === 0 ? (
//         <p className="no-events">No events found.</p>
//       ) : (
//         <ul className="event-list">
//           {events.map(({ _id, title, date, location, link }) => (
//             <li key={_id} className="event-item">
//               <h3 className="event-title">{title}</h3>
//               <p className="event-detail">
//                 <span>Date:</span> {date}
//               </p>
//               <p className="event-detail">
//                 <span>Location:</span> {location}
//               </p>
//               <button
//                 onClick={() => openModal({ _id, title, link })}
//                 className="ticket-button"
//               >
//                 GET TICKETS
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2 className="modal-title">Get Tickets for {selectedEvent.title}</h2>
//             <form onSubmit={handleSubmit}>
//               <label className="form-label" htmlFor="email">
//                 Enter your email:
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="form-input"
//                 placeholder="you@example.com"
//               />
//               <div className="button-group">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="cancel-button"
//                   disabled={sending}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="submit-button"
//                   disabled={sending}
//                 >
//                   {sending ? "Sending..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;





// import React, { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [email, setEmail] = useState("");
//   const [sending, setSending] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("all");
//   const [dateSort, setDateSort] = useState("asc");

//   useEffect(() => {
//     fetch("http://localhost:5000/api/events")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch events");
//         return res.json();
//       })
//       .then((data) => {
//         setEvents(data);
//         setFilteredEvents(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     let results = [...events];
    
//     // Apply search filter
//     if (searchTerm) {
//       results = results.filter(event =>
//         event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         event.description?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     // Apply location filter
//     if (locationFilter !== "all") {
//       results = results.filter(event => 
//         event.location.toLowerCase().includes(locationFilter.toLowerCase())
//       );
//     }
    
//     // Apply date sorting
//     results.sort((a, b) => {
//       const dateA = new Date(a.date);
//       const dateB = new Date(b.date);
//       return dateSort === "asc" ? dateA - dateB : dateB - dateA;
//     });
    
//     setFilteredEvents(results);
//   }, [searchTerm, locationFilter, dateSort, events]);

//   const openModal = (event) => {
//     setSelectedEvent(event);
//     setEmail("");
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) return alert("Please enter your email.");
//     setSending(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/optin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, eventId: selectedEvent._id }),
//       });
//       if (!res.ok) throw new Error("Failed to save email");
//       setShowModal(false);
//       window.open(selectedEvent.link, "_blank");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setSending(false);
//     }
//   };

//   const locations = [...new Set(events.map(event => event.location))];

//   if (loading)
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p className="loading-message">Loading events...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="error-container">
//         <p className="error-message">Error: {error}</p>
//         <button onClick={() => window.location.reload()} className="retry-button">
//           Try Again
//         </button>
//       </div>
//     );

//   return (
//     <div className="app-container">
//       <header className="app-header">
//         <h1>Upcoming Events</h1>
//         <p className="subtitle">Discover and register for exciting events near you</p>
//       </header>

//       <div className="controls-container">
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search events..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//           <svg className="search-icon" viewBox="0 0 24 24">
//             <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
//           </svg>
//         </div>

//         <div className="filters-container">
//           <select
//             value={locationFilter}
//             onChange={(e) => setLocationFilter(e.target.value)}
//             className="filter-select"
//           >
//             <option value="all">All Locations</option>
//             {locations.map(location => (
//               <option key={location} value={location}>{location}</option>
//             ))}
//           </select>

//           <select
//             value={dateSort}
//             onChange={(e) => setDateSort(e.target.value)}
//             className="filter-select"
//           >
//             <option value="asc">Date: Earliest First</option>
//             <option value="desc">Date: Latest First</option>
//           </select>
//         </div>
//       </div>

//       {filteredEvents.length === 0 ? (
//         <div className="no-events-container">
//           <svg className="no-events-icon" viewBox="0 0 24 24">
//             <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
//           </svg>
//           <p className="no-events-message">No events found matching your criteria.</p>
//           {searchTerm || locationFilter !== "all" ? (
//             <button 
//               onClick={() => {
//                 setSearchTerm("");
//                 setLocationFilter("all");
//               }} 
//               className="clear-filters-button"
//             >
//               Clear Filters
//             </button>
//           ) : null}
//         </div>
//       ) : (
//         <div className="event-grid">
//           {filteredEvents.map(({ _id, title, date, location, link, description }) => {
//             const eventDate = new Date(date);
//             const formattedDate = eventDate.toLocaleDateString('en-US', {
//               weekday: 'short',
//               month: 'short',
//               day: 'numeric',
//               year: 'numeric'
//             });
//             const formattedTime = eventDate.toLocaleTimeString('en-US', {
//               hour: '2-digit',
//               minute: '2-digit'
//             });
            
//             return (
//               <div key={_id} className="event-card">
//                 <div className="event-date">
//                   <div className="event-day">{eventDate.getDate()}</div>
//                   <div className="event-month">{eventDate.toLocaleString('default', { month: 'short' })}</div>
//                 </div>
//                 <div className="event-content">
//                   <h3 className="event-title">{title}</h3>
//                   <div className="event-meta">
//                     <span className="event-location">
//                       <svg className="location-icon" viewBox="0 0 24 24">
//                         <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
//                       </svg>
//                       {location}
//                     </span>
//                     <span className="event-time">
//                       <svg className="time-icon" viewBox="0 0 24 24">
//                         <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
//                         <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
//                       </svg>
//                       {formattedTime}
//                     </span>
//                   </div>
//                   {description && <p className="event-description">{description}</p>}
//                   <div className="event-footer">
//                     <span className="event-full-date">{formattedDate}</span>
//                     <button
//                       onClick={() => openModal({ _id, title, link })}
//                       className="ticket-button"
//                     >
//                       Get Tickets
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <button 
//               onClick={() => setShowModal(false)} 
//               className="modal-close-button"
//               disabled={sending}
//             >
//               &times;
//             </button>
//             <div className="modal-header">
//               <h2 className="modal-title">Get Tickets</h2>
//               <p className="modal-subtitle">{selectedEvent.title}</p>
//             </div>
//             <form onSubmit={handleSubmit} className="modal-form">
//               <div className="form-group">
//                 <label className="form-label" htmlFor="email">
//                   Enter your email to register:
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="form-input"
//                   placeholder="you@example.com"
//                 />
//               </div>
//               <div className="form-footer">
//                 <button
//                   type="submit"
//                   className="submit-button"
//                   disabled={sending}
//                 >
//                   {sending ? (
//                     <>
//                       <svg className="spinner-icon" viewBox="0 0 24 24">
//                         <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
//                       </svg>
//                       Processing...
//                     </>
//                   ) : (
//                     "Register & Get Tickets"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



// import React, { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [email, setEmail] = useState("");
//   const [sending, setSending] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("all");
//   const [dateSort, setDateSort] = useState("asc");

//   // Function to parse different date formats
//   const parseEventDate = (dateString) => {
//     if (!dateString) return new Date();
    
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);
    
//     // Handle "Today" with time
//     if (dateString.toLowerCase().includes('today')) {
//       const timeMatch = dateString.match(/(\d{1,2}(?:\.\d{2})?)(am|pm)/i);
//       if (timeMatch) {
//         const [, time, period] = timeMatch;
//         const hour = parseFloat(time);
//         const adjustedHour = period.toLowerCase() === 'pm' && hour !== 12 ? hour + 12 : 
//                            period.toLowerCase() === 'am' && hour === 12 ? 0 : hour;
        
//         const result = new Date(today);
//         result.setHours(Math.floor(adjustedHour), (adjustedHour % 1) * 60, 0, 0);
//         return result;
//       }
//       return today;
//     }
    
//     // Handle "Tomorrow"
//     if (dateString.toLowerCase().includes('tomorrow')) {
//       return tomorrow;
//     }
    
//     // Handle standard date formats like "30 May 2025"
//     const standardDate = new Date(dateString);
//     if (!isNaN(standardDate.getTime())) {
//       return standardDate;
//     }
    
//     // If all else fails, return today's date
//     return today;
//   };

//   // Function to extract time from date string
//   const extractTime = (dateString) => {
//     if (!dateString) return null;
    
//     // Look for time patterns like "6pm to 8pm" or "9.30am to 1pm"
//     const timeMatch = dateString.match(/(\d{1,2}(?:\.\d{2})?)(am|pm)/i);
//     if (timeMatch) {
//       const [, time, period] = timeMatch;
//       const hour = parseFloat(time);
//       const adjustedHour = period.toLowerCase() === 'pm' && hour !== 12 ? hour + 12 : 
//                          period.toLowerCase() === 'am' && hour === 12 ? 0 : hour;
      
//       const minutes = (adjustedHour % 1) * 60;
//       const hours = Math.floor(adjustedHour);
      
//       return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//     }
    
//     return null;
//   };

//   useEffect(() => {
//     fetch("http://localhost:5000/api/events")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch events");
//         return res.json();
//       })
//       .then((data) => {
//         setEvents(data);
//         setFilteredEvents(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     let results = [...events];
   
//     // Apply search filter
//     if (searchTerm) {
//       results = results.filter(event =>
//         event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         event.description?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
   
//     // Apply location filter
//     if (locationFilter !== "all") {
//       results = results.filter(event =>
//         event.location.toLowerCase().includes(locationFilter.toLowerCase())
//       );
//     }
   
//     // Apply date sorting with improved date parsing
//     results.sort((a, b) => {
//       const dateA = parseEventDate(a.date);
//       const dateB = parseEventDate(b.date);
//       return dateSort === "asc" ? dateA - dateB : dateB - dateA;
//     });
   
//     setFilteredEvents(results);
//   }, [searchTerm, locationFilter, dateSort, events]);

//   const openModal = (event) => {
//     setSelectedEvent(event);
//     setEmail("");
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) return alert("Please enter your email.");
//     setSending(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/optin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, eventId: selectedEvent._id }),
//       });
//       if (!res.ok) throw new Error("Failed to save email");
//       setShowModal(false);
//       window.open(selectedEvent.link, "_blank");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setSending(false);
//     }
//   };

//   const locations = [...new Set(events.map(event => event.location))];

//   if (loading)
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p className="loading-message">Loading events...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="error-container">
//         <p className="error-message">Error: {error}</p>
//         <button onClick={() => window.location.reload()} className="retry-button">
//           Try Again
//         </button>
//       </div>
//     );

//   return (
//     <div className="app-container">
//       <header className="app-header">
//         <h1>Upcoming Events</h1>
//         <p className="subtitle">Discover and register for exciting events near you</p>
//       </header>

//       <div className="controls-container">
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search events..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//           <svg className="search-icon" viewBox="0 0 24 24">
//             <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
//           </svg>
//         </div>

//         <div className="filters-container">
//           <select
//             value={locationFilter}
//             onChange={(e) => setLocationFilter(e.target.value)}
//             className="filter-select"
//           >
//             <option value="all">All Locations</option>
//             {locations.map(location => (
//               <option key={location} value={location}>{location}</option>
//             ))}
//           </select>

//           <select
//             value={dateSort}
//             onChange={(e) => setDateSort(e.target.value)}
//             className="filter-select"
//           >
//             <option value="asc">Date: Earliest First</option>
//             <option value="desc">Date: Latest First</option>
//           </select>
//         </div>
//       </div>

//       {filteredEvents.length === 0 ? (
//         <div className="no-events-container">
//           <svg className="no-events-icon" viewBox="0 0 24 24">
//             <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
//           </svg>
//           <p className="no-events-message">No events found matching your criteria.</p>
//           {searchTerm || locationFilter !== "all" ? (
//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setLocationFilter("all");
//               }}
//               className="clear-filters-button"
//             >
//               Clear Filters
//             </button>
//           ) : null}
//         </div>
//       ) : (
//         <div className="event-grid">
//           {filteredEvents.map(({ _id, title, date, location, link, description }) => {
//             const eventDate = parseEventDate(date);
//             const extractedTime = extractTime(date);
            
//             // Format the date
//             const formattedDate = eventDate.toLocaleDateString('en-US', {
//               weekday: 'short',
//               month: 'short',
//               day: 'numeric',
//               year: 'numeric'
//             });
            
//             // Use extracted time or format from date
//             const formattedTime = extractedTime || eventDate.toLocaleTimeString('en-US', {
//               hour: '2-digit',
//               minute: '2-digit'
//             });
           
//             return (
//               <div key={_id} className="event-card">
//                 <div className="event-date">
//                   <div className="event-day">{eventDate.getDate()}</div>
//                   <div className="event-month">{eventDate.toLocaleString('default', { month: 'short' })}</div>
//                 </div>
//                 <div className="event-content">
//                   <h3 className="event-title">{title}</h3>
//                   <div className="event-meta">
//                     <span className="event-location">
//                       <svg className="location-icon" viewBox="0 0 24 24">
//                         <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
//                       </svg>
//                       {location}
//                     </span>
//                     <span className="event-time">
//                       <svg className="time-icon" viewBox="0 0 24 24">
//                         <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
//                         <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
//                       </svg>
//                       {formattedTime}
//                     </span>
//                   </div>
//                   {description && <p className="event-description">{description}</p>}
//                   <div className="event-footer">
//                     <span className="event-full-date">{formattedDate}</span>
//                     <button
//                       onClick={() => openModal({ _id, title, link })}
//                       className="ticket-button"
//                     >
//                       Get Tickets
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <button
//               onClick={() => setShowModal(false)}
//               className="modal-close-button"
//               disabled={sending}
//             >
//               &times;
//             </button>
//             <div className="modal-header">
//               <h2 className="modal-title">Get Tickets</h2>
//               <p className="modal-subtitle">{selectedEvent.title}</p>
//             </div>
//             <form onSubmit={handleSubmit} className="modal-form">
//               <div className="form-group">
//                 <label className="form-label" htmlFor="email">
//                   Enter your email to register:
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="form-input"
//                   placeholder="you@example.com"
//                 />
//               </div>
//               <div className="form-footer">
//                 <button
//                   type="submit"
//                   className="submit-button"
//                   disabled={sending}
//                 >
//                   {sending ? (
//                     <>
//                       <svg className="spinner-icon" viewBox="0 0 24 24">
//                         <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
//                       </svg>
//                       Processing...
//                     </>
//                   ) : (
//                     "Register & Get Tickets"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;





// import React, { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [email, setEmail] = useState("");
//   const [sending, setSending] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("all");
//   const [dateSort, setDateSort] = useState("asc");

//    const openTelegramBot = () => {
//     window.open("https://t.me/event_guide_bot", "_blank");
//   };

//   // Function to parse different date formats
//   const parseEventDate = (dateString) => {
//     if (!dateString) return new Date();
    
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);
    
//     // Handle "Today" with time
//     if (dateString.toLowerCase().includes('today')) {
//       const timeMatch = dateString.match(/(\d{1,2}(?:\.\d{2})?)(am|pm)/i);
//       if (timeMatch) {
//         const [, time, period] = timeMatch;
//         const hour = parseFloat(time);
//         const adjustedHour = period.toLowerCase() === 'pm' && hour !== 12 ? hour + 12 : 
//                            period.toLowerCase() === 'am' && hour === 12 ? 0 : hour;
        
//         const result = new Date(today);
//         const minutes = Math.round((adjustedHour % 1) * 60);
//         const hours = Math.floor(adjustedHour);
//         result.setHours(hours, minutes, 0, 0);
//         return result;
//       }
//       return today;
//     }
    
//     // Handle "Tomorrow"
//     if (dateString.toLowerCase().includes('tomorrow')) {
//       return tomorrow;
//     }
    
//     // Handle standard date formats like "30 May 2025"
//     const standardDate = new Date(dateString);
//     if (!isNaN(standardDate.getTime())) {
//       return standardDate;
//     }
    
//     // If all else fails, return today's date
//     return today;
//   };

//   // Function to extract time from date string
//   const extractTime = (dateString) => {
//     if (!dateString) return null;
    
//     // Look for time ranges like "6pm to 8pm" or "9.30am to 1pm"
//     const timeRangeMatch = dateString.match(/(\d{1,2}(?:\.\d{2})?)(am|pm)\s*to\s*(\d{1,2}(?:\.\d{2})?)(am|pm)/i);
//     if (timeRangeMatch) {
//       const [, startTime, startPeriod, endTime, endPeriod] = timeRangeMatch;
      
//       // Parse start time
//       const startHour = parseFloat(startTime);
//       const startAdjustedHour = startPeriod.toLowerCase() === 'pm' && startHour !== 12 ? startHour + 12 : 
//                                startPeriod.toLowerCase() === 'am' && startHour === 12 ? 0 : startHour;
      
//       const startMinutes = Math.round((startAdjustedHour % 1) * 60);
//       const startHours = Math.floor(startAdjustedHour);
      
//       // Parse end time
//       const endHour = parseFloat(endTime);
//       const endAdjustedHour = endPeriod.toLowerCase() === 'pm' && endHour !== 12 ? endHour + 12 : 
//                              endPeriod.toLowerCase() === 'am' && endHour === 12 ? 0 : endHour;
      
//       const endMinutes = Math.round((endAdjustedHour % 1) * 60);
//       const endHours = Math.floor(endAdjustedHour);
      
//       const formatTime = (hours, minutes) => {
//         return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//       };
      
//       return `${formatTime(startHours, startMinutes)} - ${formatTime(endHours, endMinutes)}`;
//     }
    
//     // Look for single time patterns like "6pm" or "9.30am"
//     const singleTimeMatch = dateString.match(/(\d{1,2}(?:\.\d{2})?)(am|pm)/i);
//     if (singleTimeMatch) {
//       const [, time, period] = singleTimeMatch;
//       const hour = parseFloat(time);
//       const adjustedHour = period.toLowerCase() === 'pm' && hour !== 12 ? hour + 12 : 
//                          period.toLowerCase() === 'am' && hour === 12 ? 0 : hour;
      
//       const minutes = Math.round((adjustedHour % 1) * 60);
//       const hours = Math.floor(adjustedHour);
      
//       return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//     }
    
//     return null;
//   };

//   useEffect(() => {
//     fetch("http://localhost:5000/api/events")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch events");
//         return res.json();
//       })
//       .then((data) => {
//         setEvents(data);
//         setFilteredEvents(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     let results = [...events];
   
//     // Apply search filter
//     if (searchTerm) {
//       results = results.filter(event =>
//         event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         event.description?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
   
//     // Apply location filter
//     if (locationFilter !== "all") {
//       results = results.filter(event =>
//         event.location.toLowerCase().includes(locationFilter.toLowerCase())
//       );
//     }
   
//     // Apply date sorting with improved date parsing
//     results.sort((a, b) => {
//       const dateA = parseEventDate(a.date);
//       const dateB = parseEventDate(b.date);
//       return dateSort === "asc" ? dateA - dateB : dateB - dateA;
//     });
   
//     setFilteredEvents(results);
//   }, [searchTerm, locationFilter, dateSort, events]);

//   const openModal = (event) => {
//     setSelectedEvent(event);
//     setEmail("");
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) return alert("Please enter your email.");
//     setSending(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/optin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, eventId: selectedEvent._id }),
//       });
//       if (!res.ok) throw new Error("Failed to save email");
//       setShowModal(false);
//       window.open(selectedEvent.link, "_blank");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setSending(false);
//     }
//   };

//   const locations = [...new Set(events.map(event => event.location))];

//   if (loading)
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p className="loading-message">Loading events...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="error-container">
//         <p className="error-message">Error: {error}</p>
//         <button onClick={() => window.location.reload()} className="retry-button">
//           Try Again
//         </button>
//       </div>
//     );

//   return (
//     <div className="app-container">
//       <header className="app-header">
//         <h1>Upcoming Events</h1>
//         <p className="subtitle">Discover and register for exciting events near you</p>
//       </header>

//       <div className="controls-container">
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search events..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//           <svg className="search-icon" viewBox="0 0 24 24">
//             <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
//           </svg>
//         </div>

//         <div className="filters-container">
//           <select
//             value={locationFilter}
//             onChange={(e) => setLocationFilter(e.target.value)}
//             className="filter-select"
//           >
//             <option value="all">All Locations</option>
//             {locations.map(location => (
//               <option key={location} value={location}>{location}</option>
//             ))}
//           </select>

//           <select
//             value={dateSort}
//             onChange={(e) => setDateSort(e.target.value)}
//             className="filter-select"
//           >
//             <option value="asc">Date: Earliest First</option>
//             <option value="desc">Date: Latest First</option>
//           </select>
//         </div>
//       </div>

//       {filteredEvents.length === 0 ? (
//         <div className="no-events-container">
//           <svg className="no-events-icon" viewBox="0 0 24 24">
//             <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
//           </svg>
//           <p className="no-events-message">No events found matching your criteria.</p>
//           {searchTerm || locationFilter !== "all" ? (
//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setLocationFilter("all");
//               }}
//               className="clear-filters-button"
//             >
//               Clear Filters
//             </button>
//           ) : null}
//         </div>
//       ) : (
//         <div className="event-grid">
//           {filteredEvents.map(({ _id, title, date, location, link, description }) => {
//             const eventDate = parseEventDate(date);
//             const extractedTime = extractTime(date);
            
//             // Format the date
//             const formattedDate = eventDate.toLocaleDateString('en-US', {
//               weekday: 'short',
//               month: 'short',
//               day: 'numeric',
//               year: 'numeric'
//             });
            
//             // Default formatted time from date object
//             const defaultFormattedTime = eventDate.toLocaleTimeString('en-US', {
//               hour: '2-digit',
//               minute: '2-digit'
//             });
            
//             // Use extracted time or show original date string for fallback
//             const displayTime = extractedTime || (date.includes('to') ? date : defaultFormattedTime);
           
//             return (
//               <div key={_id} className="event-card">
//                 <div className="event-date">
//                   <div className="event-day">{eventDate.getDate()}</div>
//                   <div className="event-month">{eventDate.toLocaleString('default', { month: 'short' })}</div>
//                 </div>
//                 <div className="event-content">
//                   <h3 className="event-title">{title}</h3>
//                   <div className="event-meta">
//                     <span className="event-location">
//                       <svg className="location-icon" viewBox="0 0 24 24">
//                         <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
//                       </svg>
//                       {location}
//                     </span>
//                     <span className="event-time">
//                       <svg className="time-icon" viewBox="0 0 24 24">
//                         <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
//                         <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
//                       </svg>
//                       {displayTime}
//                     </span>
//                   </div>
//                   {description && <p className="event-description">{description}</p>}
//                   <div className="event-footer">
//                     <span className="event-full-date">{formattedDate}</span>
//                     <button
//                       onClick={() => openModal({ _id, title, link })}
//                       className="ticket-button"
//                     >
//                       Get Tickets
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <button
//               onClick={() => setShowModal(false)}
//               className="modal-close-button"
//               disabled={sending}
//             >
//               &times;
//             </button>
//             <div className="modal-header">
//               <h2 className="modal-title">Get Tickets</h2>
//               <p className="modal-subtitle">{selectedEvent.title}</p>
//             </div>
//             <form onSubmit={handleSubmit} className="modal-form">
//               <div className="form-group">
//                 <label className="form-label" htmlFor="email">
//                   Enter your email to register:
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="form-input"
//                   placeholder="you@example.com"
//                 />
//               </div>
//               <div className="form-footer">
//                 <button
//                   type="submit"
//                   className="submit-button"
//                   disabled={sending}
//                 >
//                   {sending ? (
//                     <>
//                       <svg className="spinner-icon" viewBox="0 0 24 24">
//                         <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
//                       </svg>
//                       Processing...
//                     </>
//                   ) : (
//                     "Register & Get Tickets"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <button onClick={openTelegramBot} className="telegram-button">
//         Chat with Event Bot on Telegram
//       </button>
//     </div>
//   );
// }

// export default App;


/* import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [dateSort, setDateSort] = useState("asc");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [dob, setDob] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const openTelegramBot = () => {
    window.open("https://t.me/event_guide_bot", "_blank");
  };

  const parseEventDate = (dateString) => {
    if (!dateString) return new Date();
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (dateString.toLowerCase().includes('today')) {
      const timeMatch = dateString.match(/(\d{1,2}(?:\.\d{2})?)(am|pm)/i);
      if (timeMatch) {
        const [, time, period] = timeMatch;
        const hour = parseFloat(time);
        const adjustedHour = period.toLowerCase() === 'pm' && hour !== 12 ? hour + 12 : 
                         period.toLowerCase() === 'am' && hour === 12 ? 0 : hour;
        
        const result = new Date(today);
        const minutes = Math.round((adjustedHour % 1) * 60);
        const hours = Math.floor(adjustedHour);
        result.setHours(hours, minutes, 0, 0);
        return result;
      }
      return today;
    }
    
    if (dateString.toLowerCase().includes('tomorrow')) {
      return tomorrow;
    }
    
    const standardDate = new Date(dateString);
    if (!isNaN(standardDate.getTime())) {
      return standardDate;
    }
    
    return today;
  };

  const extractTime = (dateString) => {
    if (!dateString) return null;
    
    const timeRangeMatch = dateString.match(/(\d{1,2}(?:\.\d{2})?)(am|pm)\s*to\s*(\d{1,2}(?:\.\d{2})?)(am|pm)/i);
    if (timeRangeMatch) {
      const [, startTime, startPeriod, endTime, endPeriod] = timeRangeMatch;
      
      const startHour = parseFloat(startTime);
      const startAdjustedHour = startPeriod.toLowerCase() === 'pm' && startHour !== 12 ? startHour + 12 : 
                               startPeriod.toLowerCase() === 'am' && startHour === 12 ? 0 : startHour;
      
      const startMinutes = Math.round((startAdjustedHour % 1) * 60);
      const startHours = Math.floor(startAdjustedHour);
      
      const endHour = parseFloat(endTime);
      const endAdjustedHour = endPeriod.toLowerCase() === 'pm' && endHour !== 12 ? endHour + 12 : 
                             endPeriod.toLowerCase() === 'am' && endHour === 12 ? 0 : endHour;
      
      const endMinutes = Math.round((endAdjustedHour % 1) * 60);
      const endHours = Math.floor(endAdjustedHour);
      
      const formatTime = (hours, minutes) => {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      };
      
      return `${formatTime(startHours, startMinutes)} - ${formatTime(endHours, endMinutes)}`;
    }
    
    const singleTimeMatch = dateString.match(/(\d{1,2}(?:\.\d{2})?)(am|pm)/i);
    if (singleTimeMatch) {
      const [, time, period] = singleTimeMatch;
      const hour = parseFloat(time);
      const adjustedHour = period.toLowerCase() === 'pm' && hour !== 12 ? hour + 12 : 
                         period.toLowerCase() === 'am' && hour === 12 ? 0 : hour;
      
      const minutes = Math.round((adjustedHour % 1) * 60);
      const hours = Math.floor(adjustedHour);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    
    return null;
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let results = [...events];
   
    if (searchTerm) {
      results = results.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
   
    if (locationFilter !== "all") {
      results = results.filter(event =>
        event.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
   
    results.sort((a, b) => {
      const dateA = parseEventDate(a.date);
      const dateB = parseEventDate(b.date);
      return dateSort === "asc" ? dateA - dateB : dateB - dateA;
    });
   
    setFilteredEvents(results);
  }, [searchTerm, locationFilter, dateSort, events]);

  const openModal = (event) => {
    setSelectedEvent(event);
    setEmail("");
    setOtp("");
    setDob("");
    setOtpSent(false);
    setRegistrationError("");
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setRegistrationError("Please enter your email.");
    if (!dob) return setRegistrationError("Please enter your date of birth.");
    
    setSending(true);
    setRegistrationError("");
    try {
      const res = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          eventId: selectedEvent._id,
          dateOfBirth: dob 
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");
      
      setOtpSent(true);
    } catch (err) {
      setRegistrationError(err.message);
    } finally {
      setSending(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) return setRegistrationError("Please enter the OTP.");
    
    setVerifying(true);
    setRegistrationError("");
    try {
      const res = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          otp, 
          eventId: selectedEvent._id,
          dateOfBirth: dob 
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to verify OTP");
      
      setShowModal(false);
      window.open(selectedEvent.link, "_blank");
    } catch (err) {
      setRegistrationError(err.message);
    } finally {
      setVerifying(false);
    }
  };

  const locations = [...new Set(events.map(event => event.location))];

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-message">Loading events...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <p className="error-message">Error: {error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Try Again
        </button>
      </div>
    );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Upcoming Events</h1>
        <p className="subtitle">Discover and register for exciting events near you</p>
      </header>

      <div className="controls-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <svg className="search-icon" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>

        <div className="filters-container">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select
            value={dateSort}
            onChange={(e) => setDateSort(e.target.value)}
            className="filter-select"
          >
            <option value="asc">Date: Earliest First</option>
            <option value="desc">Date: Latest First</option>
          </select>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="no-events-container">
          <svg className="no-events-icon" viewBox="0 0 24 24">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
          <p className="no-events-message">No events found matching your criteria.</p>
          {searchTerm || locationFilter !== "all" ? (
            <button
              onClick={() => {
                setSearchTerm("");
                setLocationFilter("all");
              }}
              className="clear-filters-button"
            >
              Clear Filters
            </button>
          ) : null}
        </div>
      ) : (
        <div className="event-grid">
          {filteredEvents.map(({ _id, title, date, location, link, description }) => {
            const eventDate = parseEventDate(date);
            const extractedTime = extractTime(date);
            
            const formattedDate = eventDate.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
            
            const defaultFormattedTime = eventDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            });
            
            const displayTime = extractedTime || (date.includes('to') ? date : defaultFormattedTime);
           
            return (
              <div key={_id} className="event-card">
                <div className="event-date">
                  <div className="event-day">{eventDate.getDate()}</div>
                  <div className="event-month">{eventDate.toLocaleString('default', { month: 'short' })}</div>
                </div>
                <div className="event-content">
                  <h3 className="event-title">{title}</h3>
                  <div className="event-meta">
                    <span className="event-location">
                      <svg className="location-icon" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      {location}
                    </span>
                    <span className="event-time">
                      <svg className="time-icon" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                      {displayTime}
                    </span>
                  </div>
                  {description && <p className="event-description">{description}</p>}
                  <div className="event-footer">
                    <span className="event-full-date">{formattedDate}</span>
                    <button
                      onClick={() => openModal({ _id, title, link })}
                      className="ticket-button"
                    >
                      Get Tickets
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => {
                setShowModal(false);
                setOtpSent(false);
              }}
              className="modal-close-button"
              disabled={sending || verifying}
            >
              &times;
            </button>
            <div className="modal-header">
              <h2 className="modal-title">Get Tickets</h2>
              <p className="modal-subtitle">{selectedEvent.title}</p>
            </div>
            
            {!otpSent ? (
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Enter your email to register:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="dob">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="form-input"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
                {registrationError && (
                  <div className="error-message">{registrationError}</div>
                )}
                <div className="form-footer">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <svg className="spinner-icon" viewBox="0 0 24 24">
                          <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                        </svg>
                        Sending OTP...
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={verifyOTP} className="modal-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="otp">
                    Enter the 6-digit OTP sent to {email}:
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    className="form-input"
                    placeholder="123456"
                    maxLength="6"
                    pattern="\d{6}"
                  />
                </div>
                {registrationError && (
                  <div className="error-message">{registrationError}</div>
                )}
                <div className="form-footer">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={verifying}
                  >
                    {verifying ? (
                      <>
                        <svg className="spinner-icon" viewBox="0 0 24 24">
                          <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      "Verify OTP & Register"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <button onClick={openTelegramBot} className="telegram-button">
        Chat with Event Bot on Telegram
      </button>
    </div>
  );
}

export default App; */




import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [dateSort, setDateSort] = useState("asc");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [dob, setDob] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const openTelegramBot = () => {
    window.open("https://t.me/event_guide_bot", "_blank");
  };

  const parseEventDate = (dateString) => {
    if (!dateString) return new Date();
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (dateString.toLowerCase().includes('today')) {
      const timeMatch = dateString.match(/(\d{1,2}(?:\.\d{2})?)(am|pm)/i);
      if (timeMatch) {
        const [, time, period] = timeMatch;
        const hour = parseFloat(time);
        const adjustedHour = period.toLowerCase() === 'pm' && hour !== 12 ? hour + 12 : 
                         period.toLowerCase() === 'am' && hour === 12 ? 0 : hour;
        
        const result = new Date(today);
        const minutes = Math.round((adjustedHour % 1) * 60);
        const hours = Math.floor(adjustedHour);
        result.setHours(hours, minutes, 0, 0);
        return result;
      }
      return today;
    }
    
    if (dateString.toLowerCase().includes('tomorrow')) {
      return tomorrow;
    }
    
    const standardDate = new Date(dateString);
    if (!isNaN(standardDate.getTime())) {
      return standardDate;
    }
    
    return today;
  };

  const extractTime = (dateString) => {
    if (!dateString) return null;
    
    const timeRangeMatch = dateString.match(/(\d{1,2}(?:\.\d{2})?)(am|pm)\s*to\s*(\d{1,2}(?:\.\d{2})?)(am|pm)/i);
    if (timeRangeMatch) {
      const [, startTime, startPeriod, endTime, endPeriod] = timeRangeMatch;
      
      const startHour = parseFloat(startTime);
      const startAdjustedHour = startPeriod.toLowerCase() === 'pm' && startHour !== 12 ? startHour + 12 : 
                               startPeriod.toLowerCase() === 'am' && startHour === 12 ? 0 : startHour;
      
      const startMinutes = Math.round((startAdjustedHour % 1) * 60);
      const startHours = Math.floor(startAdjustedHour);
      
      const endHour = parseFloat(endTime);
      const endAdjustedHour = endPeriod.toLowerCase() === 'pm' && endHour !== 12 ? endHour + 12 : 
                             endPeriod.toLowerCase() === 'am' && endHour === 12 ? 0 : endHour;
      
      const endMinutes = Math.round((endAdjustedHour % 1) * 60);
      const endHours = Math.floor(endAdjustedHour);
      
      const formatTime = (hours, minutes) => {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      };
      
      return `${formatTime(startHours, startMinutes)} - ${formatTime(endHours, endMinutes)}`;
    }
    
    const singleTimeMatch = dateString.match(/(\d{1,2}(?:\.\d{2})?)(am|pm)/i);
    if (singleTimeMatch) {
      const [, time, period] = singleTimeMatch;
      const hour = parseFloat(time);
      const adjustedHour = period.toLowerCase() === 'pm' && hour !== 12 ? hour + 12 : 
                         period.toLowerCase() === 'am' && hour === 12 ? 0 : hour;
      
      const minutes = Math.round((adjustedHour % 1) * 60);
      const hours = Math.floor(adjustedHour);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    
    return null;
  };

  // Handle image loading errors with fallback
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const fallback = e.target.nextElementSibling;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let results = [...events];
   
    if (searchTerm) {
      results = results.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
   
    if (locationFilter !== "all") {
      results = results.filter(event =>
        event.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
   
    results.sort((a, b) => {
      const dateA = parseEventDate(a.date);
      const dateB = parseEventDate(b.date);
      return dateSort === "asc" ? dateA - dateB : dateB - dateA;
    });
   
    setFilteredEvents(results);
  }, [searchTerm, locationFilter, dateSort, events]);

  const openModal = (event) => {
    setSelectedEvent(event);
    setEmail("");
    setOtp("");
    setDob("");
    setOtpSent(false);
    setRegistrationError("");
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setRegistrationError("Please enter your email.");
    if (!dob) return setRegistrationError("Please enter your date of birth.");
    
    setSending(true);
    setRegistrationError("");
    try {
      const res = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          eventId: selectedEvent._id,
          dateOfBirth: dob 
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");
      
      setOtpSent(true);
    } catch (err) {
      setRegistrationError(err.message);
    } finally {
      setSending(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) return setRegistrationError("Please enter the OTP.");
    
    setVerifying(true);
    setRegistrationError("");
    try {
      const res = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          otp, 
          eventId: selectedEvent._id,
          dateOfBirth: dob 
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to verify OTP");
      
      setShowModal(false);
      window.open(selectedEvent.link, "_blank");
    } catch (err) {
      setRegistrationError(err.message);
    } finally {
      setVerifying(false);
    }
  };

  const locations = [...new Set(events.map(event => event.location))];

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-message">Loading events...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <p className="error-message">Error: {error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Try Again
        </button>
      </div>
    );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Upcoming Events</h1>
        <p className="subtitle">Discover and register for exciting events near you</p>
      </header>

      <div className="controls-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <svg className="search-icon" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>

        <div className="filters-container">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select
            value={dateSort}
            onChange={(e) => setDateSort(e.target.value)}
            className="filter-select"
          >
            <option value="asc">Date: Earliest First</option>
            <option value="desc">Date: Latest First</option>
          </select>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="no-events-container">
          <svg className="no-events-icon" viewBox="0 0 24 24">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
          <p className="no-events-message">No events found matching your criteria.</p>
          {searchTerm || locationFilter !== "all" ? (
            <button
              onClick={() => {
                setSearchTerm("");
                setLocationFilter("all");
              }}
              className="clear-filters-button"
            >
              Clear Filters
            </button>
          ) : null}
        </div>
      ) : (
        <div className="event-grid">
          {filteredEvents.map(({ _id, title, date, location, link, description, image }) => {
            const eventDate = parseEventDate(date);
            const extractedTime = extractTime(date);
            
            const formattedDate = eventDate.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
            
            const defaultFormattedTime = eventDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            });
            
            const displayTime = extractedTime || (date.includes('to') ? date : defaultFormattedTime);
           
            return (
              <div key={_id} className="event-card">
                {/* Event Image Section */}
                <div className="event-image-container">
                  {image ? (
                    <>
                      <img 
                        src={image} 
                        alt={title}
                        className="event-image"
                        onError={handleImageError}
                      />
                      <div className="event-image-fallback" style={{ display: 'none' }}>
                        <svg className="fallback-icon" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                        <span>Event Image</span>
                      </div>
                    </>
                  ) : (
                    <div className="event-image-fallback">
                      <svg className="fallback-icon" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                      </svg>
                      <span>Event Image</span>
                    </div>
                  )}
                  
                  {/* Date overlay on image */}
                  <div className="event-date-overlay">
                    <div className="event-day">{eventDate.getDate()}</div>
                    <div className="event-month">{eventDate.toLocaleString('default', { month: 'short' })}</div>
                  </div>
                </div>

                <div className="event-content">
                  <h3 className="event-title">{title}</h3>
                  <div className="event-meta">
                    <span className="event-location">
                      <svg className="location-icon" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      {location}
                    </span>
                    <span className="event-time">
                      <svg className="time-icon" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                      {displayTime}
                    </span>
                  </div>
                  {description && <p className="event-description">{description}</p>}
                  <div className="event-footer">
                    <span className="event-full-date">{formattedDate}</span>
                    <button
                      onClick={() => openModal({ _id, title, link })}
                      className="ticket-button"
                    >
                      Get Tickets
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => {
                setShowModal(false);
                setOtpSent(false);
              }}
              className="modal-close-button"
              disabled={sending || verifying}
            >
              &times;
            </button>
            <div className="modal-header">
              <h2 className="modal-title">Get Tickets</h2>
              <p className="modal-subtitle">{selectedEvent.title}</p>
            </div>
            
            {!otpSent ? (
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Enter your email to register:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="dob">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="form-input"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
                {registrationError && (
                  <div className="error-message">{registrationError}</div>
                )}
                <div className="form-footer">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <svg className="spinner-icon" viewBox="0 0 24 24">
                          <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                        </svg>
                        Sending OTP...
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={verifyOTP} className="modal-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="otp">
                    Enter the 6-digit OTP sent to {email}:
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    className="form-input"
                    placeholder="123456"
                    maxLength="6"
                    pattern="\d{6}"
                  />
                </div>
                {registrationError && (
                  <div className="error-message">{registrationError}</div>
                )}
                <div className="form-footer">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={verifying}
                  >
                    {verifying ? (
                      <>
                        <svg className="spinner-icon" viewBox="0 0 24 24">
                          <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      "Verify OTP & Register"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <button onClick={openTelegramBot} className="telegram-button">
        Chat with Event Bot on Telegram
      </button>
    </div>
  );
}

export default App;