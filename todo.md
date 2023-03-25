# Full Features
<!-- - exam review: -->
  <!-- -  subjective exam review -->
  <!-- -  objective review ui -->
  <!-- -  total marks at the end of paper -->
- paper chechking:
  <!-- - Objective questions should be shown first -->
  <!-- - Then subjective questions should be shown with correct order, as they are shown in paper attempt, here faculty also marks the attempts -->
  <!-- - Then faculty should proceed, here a summary of student's attempt should be shown, such as marks obtained -->
  <!-- - Then faculty go back to a table where they can see a table of every student's attempt of a specific quiz, and also see who did not attempt that quiz -->
  <!-- - When all student's exam has been marked, the status of that exam should be "marked", and faculty should still be able to see the above tables -->
  - all faculties assigned to that course should be able to see the above tables
  - add exam status in exam details
# Incomplete features
<!-- send notification to faculty when exam time ends -->
<!-- in objective question attempt, allow to select only correct number of option e.g if there are 2 correct options, then student can select only 2 options -->
<!--done while registering a student admin should also be able to enroll student in a course  -->
<!-- While creating a child question, the max marks should be less then parent question's remaining marks-->
<!-- child marks cant be more than parent but issue cuz if another child then it doesn't consider children before it -->
<!-- default value should be true for long question checkbox while making subjective question in exam -->
<!-- 9 "Closed" Status for paper once paper end time and date have elapsed. -->

<!-- In the SPA table: -->
   <!-- - if a student paper record does not exist, then the status of exam should be shown as "not attempted" in mark exam list -->
   <!-- - when a paper attempt starts the spa status should be updated to "attempted" -->
   <!-- - if time ends it should update to "time ended" -->
   <!-- - if submitted on time, it should update to "submitted" -->
   <!-- - when teacher marks the exam it should be "marked" -->
# Bug fixes
<!-- when paper submitted, clear that paper from local storage -->
<!-- cgpa input field should be a number and can only accept nums 0 to 4 with step 0.01 in making student by admin -->
<!-- faculty must select correct answer for subjective while making an exam -->
<!-- parent question not being selected for child question in select tag -->
<!-- when editing an exam, original date and time of the exam is not received -->
<!-- time not being shown correctly in viewing screen of future paper -->
marks not updated if an individual question is marked
marks being doubled in mark exam on initial load
total marks are shown more than actual marks, because a parent question's marks are also counted

<!-- while creating subjective question, question number can not be changed to 1 if it has a parent question  -->

#14/3/23
<!-- padding in login -->
<!-- add image in register -->
<!-- time allowed when mcq create -->
<!-- checkboxes in edit draft -->
<!-- loading states -->
<!-- delete notification (mark as read) -->
<!-- can select max 2 -->
<!-- numbering issue when flag -->
<!-- same notif multiple times issue -->
<!-- admin should be able to edit exam details -->
<!-- correct bold in exam mark -->
<!-- marked button -->
save marks in subjective marking takes previous marks, not currently changed marks


# To be asked
<!-- functionality of assign in exam table of admin -->
5 Line for Exam in the table
8 No Comment alert when marking paper
10 Student Profile Picture Display Area

### Later if needed
- protect routes of everyone
- clear all console logs

### New

<!-- 1 Delete Faculty feature not working -->
<!-- 2 Admin cannot remove Assigned faculty. -->
<!-- 3 Option to remove assigned faculty -->
<!-- 4 Add check to not assign same Faculty ID to a course twice -->
5 Assigning Faculty to Exam feature not working
<!-- 6 Photo Upload for faculty edit not Working. -->
<!-- 7 Save or Submit Key for Marking Subjective. (Should display complete paper Sub + Obj) -->
<!-- 8 Create New MCQ should have 60 seconds by default in Time Allowed slot whenever new MCQ is added Faculty -->
<!-- 9 Provide Back Keys to Navigate between Exam create stages -->
<!-- 10 Exam Settings should retain the first input given. Currently it resets to default every time user revisits -->
<!-- 11 Admin cannot assign student ID to a course -->
<!-- 12 Admin cannot Edit paper once approved? Exam Settings need to be editable for Admin -->
<!-- 13 Objective time not displaying when adding new MCQ -->
<!-- 14 Once submitted for approval. When SI edits, objective data is not retained. -->
<!-- 15 Close Notification key on Faculty Notification drop down -->
16 Loader State
<!-- 17 Repeating Notifications? Same notification recurring on every login -->
<!-- 18 Highlight Correct Option when marking paper and reviewing paper -->
remove /faculty from edit exam page route


<!-- Status Update once marked for all students. Should share result with Senior faculty -->
<!-- Student review Page and Comment Function -->
Admin ID backdoor. Password recovery
I.E Exam upload and attempt testing

#15/03/23
### Ali
<!-- incorrect time in notifications -->
  <!-- make a function that returns the same string 5 hrs ahead -->
<!-- when question navigate in attempt, the answer should be retained
  make loading components
  fetch soa and ssa in respective components and set them
  for objective, check the method used to mark in objective review container
comment feature in paper review
  add comment field in spa table, default null
  on exam review page, add a comment component that gets(if any) and sets comment in database 
  use same api to get comment, and another api to set comment, (both are made)
api correction in making subjective qs -->
<!-- if not marked unmarked in subjecTive marking -->
### fahad
<!-- reload on save marks -->
  <!-- error cuz pnumber check -->
### ali abdullah
<!-- answer too dim in paper mark -->
if student attempted, and exam not marked, then marks obtained should be "unmarked"
infinte loop error in log when multiple answers checkbox is checked in create objective answers
data retaining issue when allow multiple edit


### New
<!-- 1 Option select button should automatically save sudents response. There should be no need for a separate "Save" key. -->
2 Approve Key to be given at faculty home page for approving papers with each line of paper in pending approval status. Faculty should have the option to approve without opening the paper. (For Comndant and Cl only)
3 Remove "Create Paper" Options from Seniority Faculty IDs (Comandant and CI)
4 Clicking on the Notification should navigate to the concerned paper
<!-- 5 "Submit to" button should be changed to "mark to" -->
<!-- 6 Remove "Send Forward" and "Send Back" Keys -->
7 Comments Section should only be enbaled when a faculty is selected from Submit to Drop Down
8 Comment should be enclosed in inverted comma's and the smaller text in subscript needs to indicate who was the comment maked to. (currently it only denotes who wrote the comment and not who it was directed to)
9 Once Faculty opens an exam, there should be a header on the top of page indicating Exam Name to notify which exam the user is currently in.
10 Cancel Key not working. When pressed should navigate user to outside of the exam edit screen
11 Invert Ul to display the adding new question functions at the top op screen and the existing questions below to cut out excessive scrolling for end user.
If not page should automatically scroll down to the right area when "Create new MCQ" or "create new Subjective is clicked"
12 Invert Ul to display older exams in approved or closed states below and the latest exams pending approval at the top of page
13 Invert Ul to display older exams in closed or marked state below and the latest attempt awaiting attempt or review at the top of page
14 Question # sequence and part # sequence should automatically assign correct serial # for subjective questions to minimize user's effort. (currently it is doing so haphazardly an dis inconsistent)
15 Create Exam steps should be clickable keys to allow simpler navigation between stages. (Exam Settings, Objective, Subjective, Exam Review)
16 Default Time for Objectives should retain the user's last choice rather than changing back to 60 seconds each time.
<!-- 17 Comment Box to be included for Faculty to add his reasoning while marking the paper -->
<!-- 18 Change Sign in page name to "ASC e-Exam System" -->
<!-- 19 "Register as student" key should have same layout as all other keys. -->
<!-- 20 Remove "Login as Faculty" key from bottom right and key "Login as Faculty" key on top right of page. -->
<!-- 21 Change "PA#" to "Army #" -->
<!-- 22 Add "Rank" field with drop down containing the following values (2nd Lt, Lt, Capt, Maj) -->
23 Add PA# and Rank fields (Capt, Major, Letenant Colonel, Colonel, Brg, Maj Gen, Lt Gen)
<!-- 24 Change Faculty levels from numbers to (Comdt, CI, SI MT, SI SW, SI AT, Inst) -->
25 Remove "Department" Field
26 Table of Existing Exams should be segregated into two tables "Previous Exams of this Course" and "Open Exams"
27 "Previous Exams of this Course" table should only hold exams that are either "marked/checked", "approved" or "closed" with a key to change marked exam to closed
28 "Open Exams" table should hold papers in statuses "darfts" or "pending approval" (It should also notify in a new column which faculty member the paper is currently with e.g SI/Ci for pending approval and instructor name for drafts)
29 Currently when selected time for exam is elapsed the exam is moved to closed state and locked forever and is inaccessible for all faculty. Admin should be able to change this status.
30 Add Course Duration fields as "Start Dat" and "End Date"
31 Add "Sponsor DS" field with a drop down of all registered faculty members to select from.
32 Add 'Course Strength" field and a cap for max # of students to be registered in each course.
33 Add Index # field instead of CGPA
34 Add "Save as Draft" or "Submit to" key in Admin panel