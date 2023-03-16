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
  - When all student's exam has been marked, the status of that exam should be "marked", and faculty should still be able to see the above tables
  - all faculties assigned to that course should be able to see the above tables
  - add exam status in exam details
# Incomplete features
<!-- send notification to faculty when exam time ends -->
<!-- in objective question attempt, allow to select only correct number of option e.g if there are 2 correct options, then student can select only 2 options -->
<!--done while registering a student admin should also be able to enroll student in a course  -->
<!-- While creating a child question, the max marks should be less then parent question's remaining marks-->
child marks cant be more than parent but issue cuz if another child then it doesn't consider children before it
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

while creating subjective question, question number can not be changed to 1 if it has a parent question 

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


Status Update once marked for all students. Should share result with Senior faculty
Student review Page and Comment Function
Admin ID backdoor. Password recovery
I.E Exam upload and attempt testing

#15/03/23
### Ali
when question navigate in attempt, the answer should be retained
comment feature in paper review
api correction in making subjective qs
incorrect time in notifications
<!-- if not marked unmarked in subjecTive marking -->
### fahad
reload on save marks
  <!-- error cuz pnumber check -->
### ali abdullah
answer too dim in paper mark
if student attempted, and exam not marked, then marks obtained should be "unmarked"
infinte loop error in log when multiple answers checkbox is checked in create objective answers
data retaining issue when allow multiple edit
