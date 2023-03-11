# Full Features
- exam review:
  <!-- -  subjective exam review -->
  <!-- -  objective review ui -->
  <!-- -  total marks at the end of paper -->
- paper chechking:
  <!-- - Objective questions should be shown first -->
  <!-- - Then subjective questions should be shown with correct order, as they are shown in paper attempt, here faculty also marks the attempts -->
  - Then faculty should proceed, here a summary of student's attempt should be shown, such as marks obtained 
  - Then faculty go back to a table where they can see a table of every student's attempt of a specific quiz, and also see who did not attempt that quiz
  - When all student's exam has been marked, the status of that exam should be "marked", and faculty should still be able to see the above tables
  - all faculties assigned to that course should be able to see the above tables
# Incomplete features
send notification to faculty when exam time ends
in objective question attempt, allow to select only correct number of option e.g if there are 2 correct options, then student can select only 2 options
<!--done while registering a student admin should also be able to enroll student in a course  -->
While creating a child question, the max marks should be less then parent question's remaining marks
default value should be true for long question checkbox while making subjective question in exam
<!-- 9 "Closed" Status for paper once paper end time and date have elapsed. -->

In the SPA table:
   - if a student paper record does not exist, then the status of exam should be shown as "not attempted" in mark exam list
   - when a paper attempt starts the spa status should be updated to "attempted"
   - if time ends it should update to "time ended"
   - if submitted on time, it should update to "submitted"
   - when teacher marks the exam it should be "marked"
   - if the status is marked, student should be able to see his marks in papersList
# Bug fixes
<!-- when paper submitted, clear that paper from local storage -->
<!-- cgpa input field should be a number and can only accept nums 0 to 4 with step 0.01 in making student by admin -->
<!-- faculty must select correct answer for subjective while making an exam -->
<!-- parent question not being selected for child question in select tag -->
<!-- when editing an exam, original date and time of the exam is not received -->
# To be asked
functionality of assign in exam table of admin
5 Line for Exam in the table
8 No Comment alert when marking paper
10 Student Profile Picture Display Area

### Later if needed
- protect routes of everyone
- clear all console logs
- some success ui on successful api call, using react toastify, or any self made component
- some loader component while loading tables and data