--User Upcoming Events
SELECT u.full_name,
       e.title,
       e.city,
       e.start_date
FROM Users u
JOIN Registrations r ON u.user_id = r.user_id
JOIN Events e ON r.event_id = e.event_id
WHERE e.status = 'upcoming'
AND u.city = e.city
ORDER BY e.start_date;

--Top Rated Events
SELECT e.event_id,
       e.title,
       AVG(f.rating) AS avg_rating,
       COUNT(*) AS feedback_count
FROM Events e
JOIN Feedback f ON e.event_id = f.event_id
GROUP BY e.event_id, e.title
HAVING COUNT(*) >= 10
ORDER BY avg_rating DESC;

--Inactive Users
SELECT u.*
FROM Users u
LEFT JOIN Registrations r
ON u.user_id = r.user_id
AND r.registration_date >= CURDATE() - INTERVAL 90 DAY
WHERE r.registration_id IS NULL;

--Peak Session Hours
SELECT e.title,
       COUNT(*) AS session_count
FROM Events e
JOIN Sessions s
ON e.event_id = s.event_id
WHERE TIME(s.start_time) BETWEEN '10:00:00' AND '12:00:00'
GROUP BY e.title;

--Most Active Cities
SELECT u.city,
       COUNT(DISTINCT r.user_id) AS registrations
FROM Users u
JOIN Registrations r
ON u.user_id = r.user_id
GROUP BY u.city
ORDER BY registrations DESC
LIMIT 5;

--Event Resource Summary
SELECT e.title,
       COUNT(CASE WHEN resource_type='pdf' THEN 1 END) AS pdfs,
       COUNT(CASE WHEN resource_type='image' THEN 1 END) AS images,
       COUNT(CASE WHEN resource_type='link' THEN 1 END) AS links
FROM Events e
LEFT JOIN Resources r
ON e.event_id = r.event_id
GROUP BY e.title;

--Low Feedback Alerts
SELECT u.full_name,
       e.title,
       f.rating,
       f.comments
FROM Feedback f
JOIN Users u
ON f.user_id = u.user_id
JOIN Events e
ON f.event_id = e.event_id
WHERE f.rating < 3;

--Sessions per Upcoming Event
SELECT e.title,
       COUNT(s.session_id) AS total_sessions
FROM Events e
LEFT JOIN Sessions s
ON e.event_id = s.event_id
WHERE e.status='upcoming'
GROUP BY e.title;

--Organizer Event Summary
SELECT u.full_name,
       e.status,
       COUNT(*) AS total_events
FROM Users u
JOIN Events e
ON u.user_id = e.organizer_id
GROUP BY u.full_name, e.status;

--Feedback Gap
SELECT e.title
FROM Events e
JOIN Registrations r
ON e.event_id = r.event_id
LEFT JOIN Feedback f
ON e.event_id = f.event_id
WHERE f.feedback_id IS NULL
GROUP BY e.title;

--Daily New User Count
SELECT registration_date,
       COUNT(*) AS new_users
FROM Users
WHERE registration_date >= CURDATE() - INTERVAL 7 DAY
GROUP BY registration_date
ORDER BY registration_date;

--Event with Maximum Sessions
SELECT e.title,
       COUNT(*) AS total_sessions
FROM Events e
JOIN Sessions s
ON e.event_id = s.event_id
GROUP BY e.event_id, e.title
HAVING COUNT(*) = (
    SELECT MAX(session_count)
    FROM (
        SELECT COUNT(*) AS session_count
        FROM Sessions
        GROUP BY event_id
    ) x
);

--Average Rating per City
SELECT e.city,
       ROUND(AVG(f.rating),2) AS avg_rating
FROM Events e
JOIN Feedback f
ON e.event_id = f.event_id
GROUP BY e.city;

--Most Registered Events
SELECT e.title,
       COUNT(r.registration_id) AS registrations
FROM Events e
JOIN Registrations r
ON e.event_id = r.event_id
GROUP BY e.title
ORDER BY registrations DESC
LIMIT 3;

--Event Session Time Conflict
SELECT s1.event_id,
       s1.title AS session1,
       s2.title AS session2
FROM Sessions s1
JOIN Sessions s2
ON s1.event_id = s2.event_id
AND s1.session_id < s2.session_id
AND s1.start_time < s2.end_time
AND s1.end_time > s2.start_time;

--Unregistered Active Users
SELECT u.*
FROM Users u
LEFT JOIN Registrations r
ON u.user_id = r.user_id
WHERE u.registration_date >= CURDATE() - INTERVAL 30 DAY
AND r.registration_id IS NULL;

--Multi-Session Speakers
SELECT speaker_name,
       COUNT(*) AS sessions_handled
FROM Sessions
GROUP BY speaker_name
HAVING COUNT(*) > 1;

--Resource Availability Check
SELECT e.title
FROM Events e
LEFT JOIN Resources r
ON e.event_id = r.event_id
WHERE r.resource_id IS NULL;

--Completed Events with Feedback Summary
SELECT e.title,
       COUNT(DISTINCT r.registration_id) AS registrations,
       ROUND(AVG(f.rating),2) AS avg_rating
FROM Events e
LEFT JOIN Registrations r
ON e.event_id = r.event_id
LEFT JOIN Feedback f
ON e.event_id = f.event_id
WHERE e.status='completed'
GROUP BY e.title;

--User Engagement Index
SELECT u.full_name,
       COUNT(DISTINCT r.event_id) AS attended_events,
       COUNT(DISTINCT f.feedback_id) AS feedbacks_given
FROM Users u
LEFT JOIN Registrations r
ON u.user_id = r.user_id
LEFT JOIN Feedback f
ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name;

--Top Feedback Providers
SELECT u.full_name,
       COUNT(*) AS total_feedbacks
FROM Users u
JOIN Feedback f
ON u.user_id = f.user_id
GROUP BY u.full_name
ORDER BY total_feedbacks DESC
LIMIT 5;

--Duplicate Registrations Check
SELECT user_id,
       event_id,
       COUNT(*) AS duplicate_count
FROM Registrations
GROUP BY user_id, event_id
HAVING COUNT(*) > 1;

--Registration Trends
SELECT DATE_FORMAT(registration_date,'%Y-%m') AS month,
       COUNT(*) AS registrations
FROM Registrations
WHERE registration_date >= CURDATE() - INTERVAL 12 MONTH
GROUP BY month
ORDER BY month;

--Average Session Duration per Event
SELECT e.title,
       ROUND(AVG(
       TIMESTAMPDIFF(MINUTE,
       s.start_time,
       s.end_time)),2) AS avg_duration
FROM Events e
JOIN Sessions s
ON e.event_id = s.event_id
GROUP BY e.title;

--Events Without Sessions
SELECT e.title
FROM Events e
LEFT JOIN Sessions s
ON e.event_id = s.event_id
WHERE s.session_id IS NULL;