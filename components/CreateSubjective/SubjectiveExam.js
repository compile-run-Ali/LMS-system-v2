import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Input from "../Common/Form/Input";
import axios from "axios";
import { ImCross } from "react-icons/im";
import Spinner from "../Loader/Spinner";
import TextArea from "../Common/Form/TextArea";
import NewQuestionInput from "../CreateObjective/NewQuestionInput";
import NoOfQuestions from "../CreateObjective/NoOfQuestions";
import Link from "next/link";
import Info_Modal from "../CreateObjective/Info_Modal";

const SubjectiveExam = ({
  exam,
  setExam,
  paperId,
  setActive,
  subjective_questions,
  setSubjectiveQuestions,
  btn_call
}) => {
  console.log("in subjective exam, btn_call: ", btn_call)

  const [difficultys, setDifficultys] = useState(["", "Easy", "Medium", "Hard"])
  const [authority, setAuthority] = useState()
  const [topics, setTopics] = useState([""])
  const [subjects, setSubjects] = useState([""])
  const [courses, setCourses] = useState([""])
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")

  const [control, setControl] = useState(false)
  const [loading, setLoading] = useState({});
  const [mcqIDs, setMcqIDs] = useState([])
  const [subjectivesLocal, setSubjectivesLocal] =
    useState(subjective_questions);
  const [previousParent, setPreviousParent] = useState(null);
  // const [longQuestion, setLongQuestion] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState({
    sq_id: "",
    question: "",
    answer: "",
    parent_sq_id: "",
    long_question: true,
    marks: 1,
    questionnumber: subjectivesLocal.length + 1,
    authority: "",
    difficulty: "",
    course: "",
    subject: "",
    topic: "",
    type: "subjective",
    checked: false
  });

  const [randomPaperConfig, setRandomPaperConfig] = useState({
    no_of_easy: 3,
    no_of_medium: 3,
    no_of_hard: 3,
    course: "",
    subject: "",
    topic: "",
    type: "subjective"
  })
 
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  
  const [prevMCQsID, setPrevMCQsID] = useState([])
  const [control_2, setControl_2] = useState(false)
  const [modalControl, setModalControl] = useState(true) //used to control info_model visibility



  async function getCoursesList(){
    try{
        const coursesList = await axios.get("/api/courses_subjects_topics/get_courses")
        let courses_names = coursesList.data.map((course) => {return course.name})
        console.log("courses_names: ", [...courses_names])
        setCourses(["", ...courses_names])
    }
    catch(error){
        console.log(error)
    }
  }

  useEffect(() => {
    console.log("courses in useEffect: ", courses)
  }, [courses])

  useEffect(() => {
    if (selectedCourse !== "" && selectedCourse !== undefined) {
      console.log("selectedCourse: ", selectedCourse)
      btn_call === "Generate Random Paper" 
      ? setRandomPaperConfig({...randomPaperConfig, ["course"]: selectedCourse})
      : setCurrentQuestion({...currentQuestion, ["course"]: selectedCourse})
      getSubjectList()
    }
  }, [selectedCourse])

  useEffect(() => {
    console.log("subjects in useEffect: ", subjects)
  }, [subjects])

  useEffect(() => {
    if (selectedSubject !== "" && selectedSubject !== undefined) {
      console.log("selectedSubject: ", selectedSubject)
      btn_call === "Generate Random Paper" 
      ? setRandomPaperConfig({...randomPaperConfig, ["subject"]: selectedSubject})
      : setCurrentQuestion({...currentQuestion, ["subject"]: selectedSubject})
      getTopicList()
    }
  }, [selectedSubject])

  useEffect(() => {
    console.log("topics in useEffect: ", topics)
  }, [topics])

  useEffect(() => {
    if (selectedTopic !== "" && selectedTopic !== undefined) {
      console.log("selectedTopic: ", selectedTopic)
      btn_call === "Generate Random Paper" 
      ? setRandomPaperConfig({...randomPaperConfig, ["topic"]: selectedTopic})
      : setCurrentQuestion({...currentQuestion, ["topic"]: selectedTopic})
    }
  }, [selectedTopic])

  useEffect(() => {
    if (selectedDifficulty !== "" && selectedDifficulty !== undefined) {
      console.log("selectedDifficulty: ", selectedDifficulty)
      setCurrentQuestion({...currentQuestion, ["difficulty"]: selectedDifficulty})
    }
  }, [selectedDifficulty])

  useEffect(() => {
    console.log("in useEffect, currentQuestion: ", currentQuestion)
  }, [currentQuestion])

  useEffect(() => {
    console.log("in useEffect, randomPaperConfig: ", randomPaperConfig)
  }, [randomPaperConfig])

  useEffect(() => {
    if(btn_call === "Create Question"){getCoursesList()}
  }, [])


  async function getSubjectList(){
      console.log("selectedCourse in getSubjectList: ", selectedCourse)
      try{
          const subjectList = await axios.get("/api/courses_subjects_topics/get_subjects",{
              params:{
                  selectedCourse: selectedCourse
              }
          })
          let subjects_names = subjectList.data.map((subject) => {return subject.name})
          console.log("subjects_names: ", [...subjects_names])
          setSubjects(["", ...subjects_names])
          // setSubjects([...subjects_names])
      }
      catch(error){
          console.log(error)
      }
  }

  async function getTopicList(){
      console.log("selectedSubject in getSubjectList: ", selectedSubject)
      try{
          const topicList = await axios.get("/api/courses_subjects_topics/get_topics",{
              params:{
                  selectedCourse: selectedCourse,
                  selectedSubject: selectedSubject
              }
          })
          let topics_names = topicList.data.map((topic) => {return topic.name})
          console.log("topics_names: ", [...topics_names])
          setTopics(["", ...topics_names])
          // setTopics([...topics_names])
      }
      catch(error){
          console.log(error)
      }
  }

  function handleSelect(event){
    console.log("event in handleSelect: ", event.target.value)
      //setError("")
      if(event.target.id === "course"){
        setSelectedCourse(event.target.value)
      }
      else if(event.target.id === "subject"){
        // setSelectedSubject(event.target.value)
        const selectedSubjects = Array.from(event.target.selectedOptions).map(
          (option) => option.value
        )
        setSelectedSubject(selectedSubjects)
      }
      else if(event.target.id === "topic"){
        // setSelectedTopic(event.target.value)
        const selectedTopics = Array.from(event.target.selectedOptions).map(
          (option) => option.value
        )
        setSelectedTopic(selectedTopics)
      }
      else if(event.target.id === "difficulty"){
        setSelectedDifficulty(event.target.value)
      }
      console.log("in handleSelect, currentQuestion: ", currentQuestion)
  }

  function reset(){
    setCourses([""])
    setSubjects([""])
    setTopics([""])
    setSelectedDifficulty("")
    setSelectedCourse("")
    setSelectedSubject("")
    setSelectedTopic("")
  }




  function handleNewQustionInputChange(event){
    const {id, value} = event.target
    {btn_call === "Generate Random Paper" 
    ? setRandomPaperConfig({...randomPaperConfig, [id]: value})
    : setCurrentQuestion({...currentQuestion, [id]: value})}
    // console.log("in handleNewQustionInputChange -> currentQuestion: ", currentQuestion)
    // console.log("in handleNewQustionInputChange -> randomPaperConfig: ", randomPaperConfig)
  }

  function handleAuthorityChange(event){
    setCurrentQuestion({...currentQuestion, authority: event.target.value})
  }

  const handleQuestionChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, question: e.target.value });
  };
  const handleAnswerChange = (e) => {
    setCurrentQuestion(btn_call === "Create Question" ? { ...currentQuestion, correct_answer: e.target.value } : { ...currentQuestion, answer: e.target.value });
  };
  const handleParentQuestionChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      parent_sq_id: e.target.value || "",
    });
  };

  const handleQuestionNumberChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      questionnumber: parseInt(e.target.value),
    });
  };

  const validateQuestionData = () => {
    const isChild = currentQuestion.parent_sq_id ? true : false;

    if (
      !currentQuestion.question ||
      !currentQuestion.questionnumber ||
      !currentQuestion.marks
    ) {
      alert("Please fill all the fields");
      return false;
    }

    // if is child then check if part number already exists
    if (isChild) {
      const parentOfAdded = subjectivesLocal.find(
        (subjective) => subjective.sq_id === currentQuestion.parent_sq_id
      );
      if (!parentOfAdded.child_question) parentOfAdded.child_question = [];
      // const partNumberExists = parentOfAdded.child_question.find(
      //   (subjective) =>
      //     subjective.questionnumber === currentQuestion.questionnumber &&
      //     subjective.sq_id !== currentQuestion.sq_id
      // );
      // if (partNumberExists) {
      //   alert("Part number already exists");
      //   return false;
      // }
      // also check that child question marks cant exceed parent question marks
      let totalMarks = 0;
      parentOfAdded.child_question.forEach((child) => {
        if (child.sq_id !== currentQuestion.sq_id) totalMarks += child.marks;
      });

      if (totalMarks + currentQuestion.marks > parentOfAdded.marks) {
        alert(
          "Total marks of all parts of a question cannot exceed the total marks of the question"
        );
        return false;
      }
    } else {
      // if a question number already exists then it cant be current questions question number
      const questionNumberExists = subjectivesLocal.find(
        (subjective) =>
          subjective.questionnumber === currentQuestion.questionnumber &&
          subjective.sq_id !== currentQuestion.sq_id
      );
      if (questionNumberExists) {
        alert("Question number already exists");
        return false;
      }
    }
    return true;
  };

  async function addQuestion(i, question){
    console.log("["+i+"] - " + "current question in addQuestion: ", question)

    try {
      const newSubjective = await axios.post(
        "/api/faculty/paper_creation/add_subjective",
        {
          btn_call,
          question_info: {
            paper_id: paperId,
            question: question.question,
            answer: question.correct_answer,
            difficulty: question.difficulty,
            topic: question.topic,
            authority: question.authority,
            parent_sq_id: "",
            long_question: true,
            marks: question.marks,
            questionnumber: i+1
            }
        }
      );
      console.log("got response of newSubjective:", newSubjective)
      // setLoading({
      //   show: false,
      //   message: "",
      // });

      
      ////
      // let updatedSubjectiveQuestions = [];
      
      // updatedSubjectiveQuestions = [
      //   ...subjectivesLocal,
      //   newSubjective.data,
      // ].sort((a, b) => a.questionnumber - b.questionnumber);
      // setSubjectivesLocal(updatedSubjectiveQuestions);

      const prevLength = subjectivesLocal.length;

      // setCurrentQuestion({
      //   sq_id: "",
      //   question: "",
      //   parent_sq_id: "",
      //   marks: 1,
      //   answer:"",
      //   long_question: true,
      //   questionnumber: prevLength + 1,
      //   authority: "",
      //   difficulty: selectedDifficulty,
      //   course: selectedCourse,
      //   subject: selectedSubject,
      //   topic: selectedTopic,
      //   type: "subjective",
      //   checked: false      
      // });
      return newSubjective.data
      ////
    } catch (err) {
      console.log("err: ", err);
      setLoading({
        error: "Error in Adding Question.",
      });
    }
  }

  const deleteCurrentQuestions = async(subjectives_ids_array) => {
    try{
      console.log("subjectives_ids_array in deleteCurrentQuestions: ", subjectives_ids_array)
      const res = await axios.post("/api/faculty/remove_subjective", {
        flag: "deleteCurrentQuestions",
        subjectives_ids_array: subjectives_ids_array
      });
    }
    catch (err) {
      console.log("err: ", err);
      setLoading({error: "Error in Deleting current Question."})
    }
  }

  function reset_highlight(){
    subjectivesLocal.map((sub) => {sub.highlight = false;})
  }

  async function handleRegenQuestions(){
    console.log("ids of current questions: ", prevMCQsID)
    console.log("subjectivesLocal: ", subjectivesLocal)
    console.log("sq_ids of current questions: ", subjectivesLocal.map((sub) => {return sub.sq_id}))

    const subs_to_regen = subjectivesLocal.filter((sub) => {return sub.checked === true})
    const subs_to_regen_sq_ids = subs_to_regen.map((sub) => {return sub.sq_id})
    
    console.log("subs_to_regen: ", subs_to_regen)
    console.log("subs_to_regen_sq_ids: ", subs_to_regen_sq_ids)

    if (subs_to_regen.length === 0) {
      alert("No questions selected to regenerate");
      return;
    }
    else{
      setLoading({
        message: "Regenerating selected questions",
      });

      reset_highlight()

      let indexes = []
      let subs_to_regen_ids = []
      for (let i = 0; i < subs_to_regen.length; i++){
        indexes = [...indexes, subjectivesLocal.indexOf(subs_to_regen[i])]
        // subs_to_regen_ids = [...subs_to_regen_ids, subjectivesLocal[indexes[indexes.length-1]]]
        subs_to_regen_ids = [...subs_to_regen_ids, mcqIDs[indexes[indexes.length-1]]]
      }

      console.log("indexes: ", indexes)
      console.log("subs_to_regen_ids: ", subs_to_regen_ids)
      
      // deleteCurrentQuestions(subs_to_regen_sq_ids)
      // const new_subs = [...subjectivesLocal]
      // const rest_ids = [...prevMCQsID]
      // for(let i = 0; i < indexes.length; i++){
      //   new_subs.splice(indexes[i]-i, 1)
      //   rest_ids.splice(indexes[i]-i, 1)
      // }

      // new_subs.map((sub, index) => {sub.questionnumber = index+1})

      try{
        const res = await axios.post("/api/paper/get_questions_databank", {randomPaperConfig, prevMCQsID, flag: "regen", subs_to_regen_ids})
        console.log("res from get_questions_databank in regen: ", res.data)
        console.log("subjectivesLocal in regen: ", subjectivesLocal)
  
        // let ids_array = [...rest_ids]
        let mcqs_array = [...subjectivesLocal]
        let new_mcq_ids = []
        let mcq_ids = [...mcqIDs]
        let mmcq;

        const res_mcqs = await Promise.all(res.data);
  
        for (let i = 0; i < res_mcqs.length; i++) {
          mmcq = addQuestion(i, res_mcqs[i])
          mcqs_array[indexes[i]] = mmcq
          mcq_ids[indexes[i]] = res_mcqs[i].id
          new_mcq_ids = [...new_mcq_ids, res_mcqs[i].id]
        }
        mcq_ids = await Promise.all(mcq_ids)
        new_mcq_ids = await Promise.all(new_mcq_ids)
        const resolvedMcqs = await Promise.all(mcqs_array);
        console.log("mcqs_array: ", resolvedMcqs)
        resolvedMcqs.map((mcq) => {mcq.checked = false})

        for(let j = 0; j < indexes.length; j++){
          resolvedMcqs[indexes[j]].highlight = true
        }

        console.log("mcqs_array after adding checked: ", resolvedMcqs)
        
        setMcqIDs(mcq_ids)
        setPrevMCQsID([...prevMCQsID, ...new_mcq_ids])
        setSubjectivesLocal(resolvedMcqs);
        setSubjectiveQuestions(resolvedMcqs)
  
        setLoading({
          show: false,
          message: "",
        });

        deleteCurrentQuestions(subs_to_regen_sq_ids)
  
      }
      catch (err) {
        if(err.response && err.response.status === 503){
          alert(err.response.data.message)
          setLoading({
            show: false,
            message: "",
          });
        }
        else{
          console.log("Error in regenerating Question: ", err);
          setLoading({error: "Error in regenerating Question."})
        }
      }
    }

  }

  function handleSelectMCQ(input_index){
    console.log("input_index: ", input_index)
    const checkedsubjectivesLocal = [...subjectivesLocal]
    console.log("checkedsubjectivesLocal in handleSelectMCQ: ", checkedsubjectivesLocal)
    checkedsubjectivesLocal[input_index].checked = !checkedsubjectivesLocal[input_index].checked
    setSubjectivesLocal(checkedsubjectivesLocal)
  }

  const handleGetQuestions = async() => {
    if(btn_call === "Generate Random Paper"){
      if (
        randomPaperConfig.no_of_easy === "" ||
        randomPaperConfig.no_of_medium === "" ||
        randomPaperConfig.no_of_hard === "" ||
        randomPaperConfig.course === "" ||
        randomPaperConfig.subject === "" ||
        randomPaperConfig.topic === ""
      ) {
        alert("Please fill all the fields");
        return;
      }
    }
    if(
      randomPaperConfig.no_of_easy < 0 ||
      randomPaperConfig.no_of_medium < 0 ||
      randomPaperConfig.no_of_hard < 0){
        alert("No of questions can't be negative");
      return;
    }

    setLoading({
      message: "Fetching questions from Data Bank",
    });

    let subjectives_ids_array = []
    for(let i = 0; i < subjectivesLocal.length; i++){
      subjectives_ids_array = [...subjectives_ids_array, subjectivesLocal[i].sq_id]
    }
    console.log("subjectives_ids_array: ", subjectives_ids_array)
    // if (subjectives_ids_array.length > 0) {deleteCurrentQuestions(subjectives_ids_array)}

    try{
      const res = await axios.post("/api/paper/get_questions_databank", {randomPaperConfig, prevMCQsID})
      console.log("res from get_questions_databank: ", res.data)

      let ids_array = []
      let mcqs_array = []
      let mmcq;

      for (let i = 0; i < res.data.length; i++) {
        ids_array = [...ids_array, res.data[i].id]
        mmcq = addQuestion(i, res.data[i])
        mcqs_array = [...mcqs_array, mmcq]
      }
      const resolvedMcqs = await Promise.all(mcqs_array);
      resolvedMcqs.map((mcq) => {mcq.checked = false})
      setSubjectivesLocal(resolvedMcqs);
      setSubjectiveQuestions(resolvedMcqs)

      setPrevMCQsID([...prevMCQsID, ...ids_array])
      setMcqIDs(ids_array)
      console.log("ids_array: ", ids_array)
      console.log("mcqs_array: ", resolvedMcqs)


      setLoading({
        show: false,
        message: "",
      });

      if (subjectives_ids_array.length > 0) {deleteCurrentQuestions(subjectives_ids_array)}
      setAdding(false);
      setControl(false);
      setControl_2(true);
      // reset()
    }
    catch (err) {
      if(err.response.status === 503){
        alert(err.response.data.message)
        setLoading({
          show: false,
          message: "",
        });
      }
      else{
        console.log("error in handleGetQuestions: ", err);
        setLoading({error: "Error in Fetching Question."})
      }
    }
  }

  async function handleAddSubjective(){
    console.log("handle add subjective accessed")
    if (
      currentQuestion.question === "" ||
      currentQuestion.correct_answer === "" ||
      currentQuestion.marks === "" ||
      currentQuestion.authority === "" ||
      currentQuestion.difficulty === "" ||
      currentQuestion.course === "" ||
      currentQuestion.subject === "" ||
      currentQuestion.topic === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    setLoading({
      message: "Adding Question",
    });

    console.log("currentQuestion in handleAddSubjective before: ", currentQuestion)
    console.log("currentQuestion.questionnumber in handleAddSubjective before: ", subjectivesLocal.length)
    console.log("subjectivesLocal in handleAddSubjective before: ", subjectivesLocal)
    console.log("subjective_questions in handleAddSubjective before: ", subjective_questions)

    try {
      setAuthority(currentQuestion.authority)
      const newSubjective = await axios.post(
        "/api/faculty/paper_creation/add_subjective",
        {
          btn_call,
          question_info: {
          question: currentQuestion.question,
          answer: currentQuestion.correct_answer,
          marks: currentQuestion.marks,
          authority: currentQuestion.authority,
          difficulty: currentQuestion.difficulty,
          course: currentQuestion.course,
          subject: currentQuestion.subject,
          topic: currentQuestion.topic,
          type: currentQuestion.type}
        }
      );
      console.log("got response of addSubjective:", newSubjective.data)
      setLoading({
        show: false,
        message: "",
      });
      
      let updatedSubjectiveQuestions = [];
      
      updatedSubjectiveQuestions = [
        ...subjectivesLocal,
        newSubjective.data,
      ].sort((a, b) => a.questionnumber - b.questionnumber);
      setSubjectivesLocal(updatedSubjectiveQuestions);
      // setSubjectiveQuestions(updatedSubjectiveQuestions);

      console.log("updatedSubjectiveQuestions in handleAddSubjective: ", updatedSubjectiveQuestions)

      const prevLength = subjectivesLocal.length;

      setCurrentQuestion({
        sq_id: "",
        question: "",
        parent_sq_id: "",
        marks: 1,
        answer:"",
        authority: "",
        long_question: true,
        questionnumber: prevLength + 1,
        difficulty: selectedDifficulty,
        course: selectedCourse,
        subject: selectedSubject,
        topic: selectedTopic,
        type: "subjective",
        checked: false
      });
      // reset()
      setAdding(false);

      console.log("currentQuestion in handleAddSubjective after: ", currentQuestion)
      console.log("currentQuestion.questionnumber in handleAddSubjective after: ", subjectivesLocal.length)
      console.log("subjectivesLocal in handleAddSubjective after: ", subjectivesLocal)
      console.log("subjective_questions in handleAddSubjective after: ", subjective_questions)

    } catch (err) {
      console.log("err: ", err);
      setLoading({
        error: "Error in Adding Question.",
      });
    }

  }

  const handleAddMCQ = async () => {
    let nextsibling;
    if (currentQuestion.parent_sq_id) {
      const parentOfAdded = subjectivesLocal.find(
        (subjective) => subjective.sq_id === currentQuestion.parent_sq_id
      );
      const siblings = parentOfAdded.child_question || [];
      siblings.sort((a, b) => a.questionnumber - b.questionnumber);

      nextsibling = 1; // start with the smallest positive integer

      for (const sibling of siblings) {
        if (sibling.questionnumber === nextsibling) {
          nextsibling++; // increment nextNum if num is present in the array
        }
      }

      console.log("nextsibling", nextsibling);
    }

    // validate data
    const isValid = validateQuestionData();
    if (!isValid) return;

    setLoading({
      message: "Adding Question...",
    });

    const isChild = currentQuestion.parent_sq_id ? true : false;
    const newSubjective = await axios.post(
      "/api/faculty/paper_creation/add_subjective",
      {
        btn_call,
        question_info: {
          paper_id: paperId,
          question: currentQuestion.question,
          answer:currentQuestion.answer,
          authority: currentQuestion.authority,
          parent_sq_id: currentQuestion.parent_sq_id,
          long_question: true,
          marks: currentQuestion.marks,
          questionnumber: currentQuestion.parent_sq_id
            ? nextsibling
            : currentQuestion.questionnumber,
        }
      }
    );
    if (newSubjective.status === 200) {
      setLoading({});
      let updatedSubjectiveQuestions = [];
      // make sure to sort the newly added question according to questionnumber
      if (isChild) {
        // if question is child, add the child to parent's children and sort the child_question array of parent

        const parentOfAdded = subjectivesLocal.find(
          (subjective) => subjective.sq_id === currentQuestion.parent_sq_id
        );
        // edit parent's child in subjectives
        const children = [
          ...(parentOfAdded.child_question || []),
          newSubjective.data,
        ].sort((a, b) => a.questionnumber - b.questionnumber);

        updatedSubjectiveQuestions = subjectivesLocal.map((subjective) => {
          if (subjective.sq_id === parentOfAdded.sq_id) {
            return { ...subjective, child_question: children };
          }
          return subjective;
        });
      } else {
        // if question is parent, add the parent to subjectives and resort the questions
        updatedSubjectiveQuestions = [
          ...subjectivesLocal,
          newSubjective.data,
        ].sort((a, b) => a.questionnumber - b.questionnumber);
      }

      const prevLength = subjectivesLocal.length;
      console.log("prevLength", prevLength);

      setSubjectivesLocal(updatedSubjectiveQuestions);
      setSubjectiveQuestions(updatedSubjectiveQuestions);
      setCurrentQuestion({
        sq_id: "",
        question: "",
        parent_sq_id: "",
        marks: 1,
        answer:"",
        authority: "",
        long_question: true,
        questionnumber: isChild ? prevLength + 1 : prevLength + 2,
        difficulty: selectedDifficulty,
        course: selectedCourse,
        subject: selectedSubject,
        topic: selectedTopic,
        type: "subjective",
        checked: false
      });
      setAdding(false);
      // reset()
    } else {
      alert("Error adding question");
    }
  };

  const handleEditMCQ = (question) => () => {
    console.log(editing, "is editing");
    window.scrollTo(0, 0);
    if (!editing && !adding) {
      setEditing(true);
      setCurrentQuestion(question);
      setPreviousParent(question.parent_sq_id);
    } else {
      alert(
        "Please save or cancel the current edit or add operation before editing another question."
      );
    }
  };

  const handleUpdateSubjective = async (question) => {
    console.log("in handleUpdateSubjective")
    console.log("question in handleUpdateSubjective: ", question)
    console.log("currentQuestion: ", currentQuestion)
    if (
      question.question === "" ||
      question.correct_answer === "" ||
      question.marks === "" ||
      question.authority === "" ||
      question.difficulty === "" ||
      question.course === "" ||
      question.subject === "" ||
      question.topic === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    if(question.marks === 0){
      alert("Marks can't be zero");
      return;
    }

    setLoading({
      message: "Updating Question",
    })

    try{
      const res = await axios.post("/api/faculty/edit_subjective",
      {
        btn_call,
        id: question.id,
        question: question.question,
        correct_answer: question.correct_answer,
        marks: question.marks,
        authority: question.authority,
        difficulty: question.difficulty,
        course: question.course,
        subject: question.subject,
        topic: question.topic
      })

      console.log("got response of edit_subjective:", res.data)
      
      setLoading({
        show: false,
        message: "",
      });

      console.log("subjectivesLocal in handleUpdateSubjective: ", subjectivesLocal)
      
      let updatedSubjectives = []
      updatedSubjectives = subjectivesLocal.map((subjective) => {
        if (subjective.id === question.id) {
          return question;
        }
        return subjective;
      });
      updatedSubjectives = updatedSubjectives.sort(
        (a, b) => a.questionnumber - b.questionnumber
      )
      console.log("updatedSubjectives in handleUpdateSubjective: ", updatedSubjectives)

      setSubjectivesLocal(updatedSubjectives);

      setCurrentQuestion({
        sq_id: "",
        question: "",
        parent_sq_id: "",
        marks: 1,
        answer:"",
        authority: "",
        long_question: true,
        questionnumber: subjectivesLocal.length + 1,
        difficulty: selectedDifficulty,
        course: selectedCourse,
        subject: selectedSubject,
        topic: selectedTopic,
        type: "subjective",
        checked: false
      });

      setEditing(false);
      
    }
    catch (err) {
      setLoading({
        error: "Error updating question.",
      });
      console.log("Error updating question", err);
    }

  }

  const handleUpdateMCQ = async (question) => {
    // variable to check if now has parent
    const isValid = validateQuestionData();
    if (!isValid) return;
    setLoading({
      message: "Updating Question...",
    });
    const nowHasParent = question.parent_sq_id ? true : false;
    // how to check if previously had parent?
    const previouslyHadParent = previousParent ? true : false;
    try{
    const res = await axios
      .post("/api/faculty/edit_subjective", {
        sq_id: question.sq_id,
        question: currentQuestion.question,
        parent_sq_id: currentQuestion.parent_sq_id,
        questionnumber: currentQuestion.questionnumber,
        authority: currentQuestion.authority,
        answer:currentQuestion.answer,
        long_question: true,
        marks: currentQuestion.marks,
      })
        setLoading({});
        // case 1: previously had parent, now no parent
        // case 2: previously had no parent, now no parent
        // case 3: previously had no parent, now has parent
        // case 4: previously had parent, now has parent
        let updatedSubjectives = [];
        // case 1: previously had parent, now no parent
        if (previouslyHadParent && !nowHasParent) {
          console.log("case 1: previously had parent, now no parent");
          // remove child from parent question array and push it in general array in sorted array
          // remove child from parent's child_question array
          const parentOfRemoved = subjectivesLocal.find(
            (subjective) => subjective.sq_id === previousParent
          );
          const children = (parentOfRemoved.child_question || []).filter(
            (child) => child.sq_id !== question.sq_id
          );
          // edit parent's child in subjectives
          updatedSubjectives = subjectivesLocal.map((subjective) => {
            if (subjective.sq_id === parentOfRemoved.sq_id) {
              return { ...subjective, child_question: children };
            }
            return subjective;
          });
          // push in general array
          updatedSubjectives = [...updatedSubjectives, question].sort(
            (a, b) => a.questionnumber - b.questionnumber
          );
        }
        // case 2: previously had no parent, now no parent OR parent not changed
        else if (!previouslyHadParent && !nowHasParent) {
          console.log("case 2: previously had no parent, now no parent");
          // just sort the array
          updatedSubjectives = subjectivesLocal.map((subjective) => {
            if (subjective.sq_id === question.sq_id) {
              return question;
            }
            return subjective;
          });
          updatedSubjectives = updatedSubjectives.sort(
            (a, b) => a.questionnumber - b.questionnumber
          );
        }
        // case 3: previously had no parent, now has parent
        else if (!previouslyHadParent && nowHasParent) {
          // working
          // push in parent array, set parent field
          console.log("case 3: previously had no parent, now has parent");
          // add the question to the parent's child_question array
          const parentOfAdded = subjectivesLocal.find(
            (subjective) => subjective.sq_id === currentQuestion.parent_sq_id
          );
          const children = [
            ...(parentOfAdded.child_question || []),
            question,
          ].sort((a, b) => a.questionnumber - b.questionnumber);
          updatedSubjectives = subjectivesLocal.map((subjective) => {
            if (subjective.sq_id === parentOfAdded.sq_id) {
              return {
                ...subjective,
                child_question: children,
              };
            }
            return subjective;
          });
          updatedSubjectives = updatedSubjectives.filter(
            (subjective) => subjective.sq_id !== question.sq_id
          );
        }
        // case 4: previously had parent, now has parent
        else if (previouslyHadParent && nowHasParent) {
          // original questions parent id does not change
          console.log("case 4: previously had parent, now has parent");

          // if parent existss but not changed
          if (currentQuestion.parent_sq_id === previousParent) {
            // only edit the current child question of parent
            const parentOfEdited = subjectivesLocal.find(
              (subjective) => subjective.sq_id === currentQuestion.parent_sq_id
            );

            const children = parentOfEdited.child_question
              .map((child_question) => {
                if (child_question.sq_id === question.sq_id) {
                  return question;
                }
                return child_question;
              })
              .sort((a, b) => a.questionnumber - b.questionnumber);

            updatedSubjectives = subjectivesLocal.map((subjective) => {
              if (subjective.sq_id === parentOfEdited.sq_id) {
                return { ...subjective, child_question: children };
              }
              return subjective;
            });
          } else {
            // remove the question from the previous parent's child_question array
            // add the question to the new parent's child_question array
            const parentOfDeleted = subjectivesLocal.find(
              (subjective) => subjective.sq_id === previousParent
            );
            const childrenAfterDeleting = parentOfDeleted.child_question.filter(
              (child) => child.sq_id !== question.sq_id
            );
            const parentOfAdded = subjectivesLocal.find(
              (subjective) => subjective.sq_id === currentQuestion.parent_sq_id
            );
            const childrenAfterAdding = [
              ...(parentOfAdded.child_question || []),
              question,
            ].sort((a, b) => a.questionnumber - b.questionnumber);
            updatedSubjectives = subjectivesLocal.map((subjective) => {
              if (subjective.sq_id === parentOfDeleted.sq_id) {
                return { ...subjective, child_question: childrenAfterDeleting };
              }
              if (subjective.sq_id === parentOfAdded.sq_id) {
                return { ...subjective, child_question: childrenAfterAdding };
              }
              return subjective;
            });
          }
        }
        setSubjectivesLocal(updatedSubjectives);
        setSubjectiveQuestions(updatedSubjectives);
        setCurrentQuestion({
          sq_id: "",
          answer:"",
          question: "",
          parent_sq_id: "",
          authority: "",
          marks: 1,
          long_question: true,
          questionnumber: subjectivesLocal.length + 1,
          difficulty: selectedDifficulty,
          course: selectedCourse,
          subject: selectedSubject,
          topic: selectedTopic,
          type: "subjective",
          checked: false
        });

        setEditing(false);
        setPreviousParent(null);
      } catch (err) {
        setLoading({
          error: "Error updating question.",
        });
        console.log("Error updating question", err);
      }

  };

  function integerToAlphabet(num) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let result = "";

    // check if num is within the range of the alphabet
    if (num <= 0 || num > 26) {
      return "Invalid input";
    }

    // convert the integer to its respective alphabet
    result = alphabet.charAt(num - 1);

    return result;
  }

  const handleDeleteSubjective = async (sq_id, parent, isChild = false) => {
    setLoading({
      message: "Deleting Question...",
    });
    
    let post_obj = {}

    if (btn_call === "Create Question"){
      post_obj = {btn_call, id: sq_id}
    }
    else{
      post_obj = {btn_call, sq_id: sq_id}
    }
    const deletedSubjective = await axios.post(
      "/api/faculty/remove_subjective",
      post_obj
    )

    if (deletedSubjective.status === 200) {
      setLoading({});
      if (isChild) {
        // we have parent of deleted question, access the parent question, and delete its child from there
        const newMCQs = [...subjectivesLocal];
        const childrenAfterDeleting = parent.child_question.filter(
          (child) => child.sq_id !== sq_id
        );
        parent.child_question = childrenAfterDeleting;
        const index = newMCQs.findIndex(
          (subjective) => subjective.sq_id === parent.sq_id
        );
        newMCQs[index] = parent;
        setSubjectivesLocal(newMCQs);
        setSubjectiveQuestions(newMCQs);
      } else {
        const newMCQs = [...subjectivesLocal];
        
        let index;

        if (btn_call === "Create Question"){
          index = newMCQs.findIndex(
            (subjective) => subjective.id === sq_id
          )
        }
        else{
          index = newMCQs.findIndex(
            (subjective) => subjective.sq_id === sq_id
          )
        }
        newMCQs.splice(index, 1);
        setSubjectivesLocal(newMCQs);
        btn_call !== "Create Question" ? setSubjectiveQuestions(newMCQs) : ""
      }
      setCurrentQuestion({
        sq_id: "",
        question: "",
        parent_sq_id: "",
        marks: 1,
        authority: "",
        answer:"",
        long_question: true,
        questionnumber: isChild
          ? subjectivesLocal.length + 1
          : subjectivesLocal.length,
        difficulty: selectedDifficulty,
        course: selectedCourse,
        subject: selectedSubject,
        topic: selectedTopic,
        type: "subjective",
        checked: false
      });
    }
  };
  // console.log(currentQuestion,"aaa")
  const updateMarks = () => {
    const totalMarks = subjectivesLocal.reduce(
      (total, subjectives) => total + subjectives.marks,
      0
    );
    // if (totalMarks !== exam.subjective_marks) {
    //   setLoading({
    //     message: "Saving...",
    //   });

      axios
        .post("/api/paper/update_total_marks", {
          paper_id: exam.paper_id,
          add_marks: totalMarks,
        })
        .then((res) => {
          console.log("Marks added in total ", res.data.total_marks);

          setExam({
            ...exam,
            subjective_marks: res.data.subjective_marks,
            total_marks: res.data.total_marks,
          });

          setLoading({});
          setActive(4);
        })
        .catch((err) => {
          setLoading({
            error: "Error in Saving.",
          });
          console.log("Error in update_total_marks", err);
        });
    
  };

  return (
    <div className="flex font-poppins flex-col items-center p-6">
      <Spinner loading={loading} />

      {!editing && 
      <div className="w-4/12 flex flex-col justify-center gap-y-4">
        <button
          onClick={() => {
            if (!editing && !adding) {
              if (btn_call === "Generate Random Paper"){
                getCoursesList()
                setControl(true)
              }
              else{
                getCoursesList()
                setAdding(true);
                setCurrentQuestion({...currentQuestion, authority: authority})
              }
            } else {
              alert(
                "Please save or cancel the current edit or add operation before editing another question."
              );
            }
          }}
          className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {btn_call === "Generate Random Paper" ? "Load Subjectives from Data Bank" : "Add Subjective"}
        </button>

        {!control && control_2 && <button
          onClick={handleRegenQuestions}
          className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Regenerate Selected Questions
        </button>}
      </div>}

      {btn_call === "Create Question" && modalControl &&
        <div className="w-full h-full backdrop-blur bg-black/50 fixed inset-0 flex items-center justify-center">
          <Info_Modal 
            difficultys={difficultys} 
            courses={courses} 
            subjects={subjects}
            topics={topics}
            handleSelect={handleSelect}
            selectedDifficulty={selectedDifficulty}
            selectedCourse={selectedCourse}
            selectedSubject={selectedSubject}
            selectedTopic={selectedTopic}
            btn_call={btn_call}
            setModalControl={setModalControl}/>
        </div>}

      {control && 
      <div className="w-full p-10 bg-slate-100 mt-6 rounded-2xl flex flex-col justify-center">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">
            Add Subjective Questions
          </h2>
          <div className="rounded-full text-white bg-red-500 my-auto flex justify-between items-center p-2 cursor-pointer">
            <button
              onClick={() => {
                setEditing(false);
                setAdding(false);
                setControl(false)
                setCurrentQuestion({
                  sq_id: "",
                  question: "",
                  parent_sq_id: "",
                  marks: 1,
                  authority: "",
                  answer:"",
                  long_question: true,
                  questionnumber: subjectivesLocal.length + 1,
                  difficulty: selectedDifficulty,
                  course: selectedCourse,
                  subject: selectedSubject,
                  topic: selectedTopic,
                  type: "subjective"
                });
                setRandomPaperConfig({
                  no_of_easy: 3,
                  no_of_medium: 3,
                  no_of_hard: 3,
                  course: selectedCourse,
                  subject: selectedSubject,
                  topic: selectedTopic,
                  type: "subjective"  
                })
              }}
            >
              <ImCross />
            </button>
          </div>
        </div>

        <div className="mb-10 mt-3">
          <p className="block mb-2 font-bold">No of Questions</p>
          <div className="flex flex-row gap-x-4">
            <NoOfQuestions label={"Easy"} id={"no_of_easy"} handleChange={handleNewQustionInputChange} value={randomPaperConfig.no_of_easy}/>
            <NoOfQuestions label={"Medium"} id={"no_of_medium"} handleChange={handleNewQustionInputChange} value={randomPaperConfig.no_of_medium}/>
            <NoOfQuestions label={"Hard"} id={"no_of_hard"} handleChange={handleNewQustionInputChange} value={randomPaperConfig.no_of_hard}/>
          </div>

        </div>

        <div className="mb-10 gap-x-4 flex justify-between">
          <NewQuestionInput label={"Course"} options={courses} id={"course"} handleChange={handleSelect} value={selectedCourse} btn_call={btn_call}/>
          <NewQuestionInput label={"Subject"} options={subjects} id={"subject"} handleChange={handleSelect} value={selectedSubject} btn_call={btn_call}/>
          <NewQuestionInput label={"Topic"} options={topics} id={"topic"} handleChange={handleSelect} value={selectedTopic} btn_call={btn_call}/>
        </div>

        <button 
        className="mt-5 bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700 w-48 self-center"
        onClick={handleGetQuestions}>
          Get Questions
        </button>
        
      </div>}


      {(editing || adding) && (
        <div className="w-full p-10 bg-slate-100 mt-6 rounded-2xl">
          <div className="w-full justify-between flex">
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit" : "Add"} Subjective Question
            </h2>
            <div
              onClick={() => {
                setEditing(false);
                setAdding(false);
                setCurrentQuestion({
                  sq_id: "",
                  question: "",
                  parent_sq_id: "",
                  marks: 1,
                  authority: "",
                  answer:"",
                  long_question: true,
                  questionnumber: subjectivesLocal.length + 1,
                });
              }}
              className="rounded-full text-white bg-red-500 my-auto flex justify-between items-center p-2 cursor-pointer"
            >
              <button>
                <ImCross />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <TextArea
              text={"Question"}
              required
              value={currentQuestion.question}
              onChange={handleQuestionChange}
            />
          </div>
          <div className="mb-4">
            <TextArea
              text={"Answer"}
              required
              value={btn_call === "Create Question" ? currentQuestion.correct_answer : currentQuestion.answer}
              onChange={handleAnswerChange}
            />
          </div>
          <div className="flex w-full gap-x-5 pb-10">
            {btn_call !== "Create Question" && <div className="mb-10 w-full mt-6">
              <label className="block mb-2">Parent Question</label>

              <select
                type="text"
                value={currentQuestion.parent_sq_id || ""}
                onChange={handleParentQuestionChange}
                className="bg-white p-2 rounded-lg border border-primary-black border-opacity-[0.15] w-full focus:outline-none focus:border-[#FEC703]"
              >
                <option value="">Select Parent Question</option>
                {subjectivesLocal
                  .filter(
                    (subjective) =>
                      !subjective.parent_sq_id &&
                      subjective.sq_id !== currentQuestion.sq_id
                  )
                  .map((subjective, index) => (
                    <option key={index} value={subjective.sq_id}>
                      {subjective.question}
                    </option>
                  ))}
              </select>
            </div>}

            <Input
              text={"Marks"}
              type={"number"}
              required
              min={0.5}
              value={currentQuestion.marks}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  marks: parseFloat(e.target.value),
                })
              }
            />

            <div className="flex flex-col w-full mt-6">
                  <label className="block mb-2">Difficulty Level</label>
                  <select
                  className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full"
                  id="difficulty"
                  onChange={handleSelect}
                  value={selectedDifficulty}
                  >
                      {difficultys.map((option, index) => (
                          <option key={index} disabled={option === "" ? true : false} value={option}>{option === "" ? "Select option" : option}</option>
                      ))}
                  </select>
            </div>

            <div className="flex flex-col w-full mt-6">
              <label htmlFor="authority">Authority</label>
              <input 
                type="text"
                id="authority"
                value={currentQuestion.authority}
                onChange={handleAuthorityChange}
                className="mt-2 bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full"
              />
            </div>

            {!currentQuestion.parent_sq_id && btn_call !== "Create Question" && (
              <Input
                // if parent exists the question number will be called part number other wise, question number
                text={
                  currentQuestion.parent_sq_id
                    ? "Part Number"
                    : "Question Number"
                }
                type={"number"}
                required
                min={1}
                value={
                  currentQuestion.questionnumber
                  // abc
                }
                onChange={handleQuestionNumberChange}
              />
            )}
          </div>

          {/* {btn_call === "Create Question" && <div className="mb-10 gap-x-4 flex justify-between">
          <NewQuestionInput label={"Difficulty Level"} options={difficultys} id={"difficulty"} handleChange={handleSelect} value={selectedDifficulty}/>
          <NewQuestionInput label={"Course"} options={courses} id={"course"} handleChange={handleSelect} value={selectedCourse} btn_call={btn_call}/>
          <NewQuestionInput label={"Subject"} options={subjects} id={"subject"} handleChange={handleSelect} value={selectedSubject} btn_call={btn_call}/>
          <NewQuestionInput label={"Topic"} options={topics} id={"topic"} handleChange={handleSelect} value={selectedTopic} btn_call={btn_call}/>
          </div>} */}

          {/* <div className="flex items-center gap-x-3 ml-2">
            <label className="block">Long Question?</label>
            <input
              type="checkbox"
              className="accent-slate-100"
              onChange={(e) => setLongQuestion(e.target.checked)}
              checked={longQuestion}
            />
          </div>
          <div className="text-sm ml-2 mb-10">
            {" "}
            (If not checked, max 50 characters will be allowed)
          </div> */}
          {editing ? (
            <button
              onClick={() => {
                btn_call === "Create Question" 
                ? handleUpdateSubjective(currentQuestion)
                : handleUpdateMCQ(currentQuestion);
              }}
              className="bg-blue-800 text-white p-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
          ) : (
            <button
              onClick={btn_call === "Create Question" ? handleAddSubjective : handleAddMCQ}
              className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Add
              
              
            </button>
            
          )}
         
        </div>
        
      )}
      <div className=" w-full pr-10 flex justify-end gap-x-5 mt-10">
        {btn_call === "Create Question" ? 
        <Link href="/faculty" className="border-2 border-[#FEC703] hover:bg-[#FEAF03] hover:text-white font-medium text-primary-black rounded-lg py-3 px-8">Back</Link>
        :
        <button
          type="button"
          className="border-2 border-[#FEC703] hover:bg-[#FEAF03] hover:text-white font-medium text-primary-black rounded-lg py-3 px-8"
          onClick={() => setActive(2)}
        >
          Back
        </button>}

        {btn_call === "Create Question" ? 
        <Link href="/faculty" className="bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8">Done</Link>
        :
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8"
          onClick={() => {
            // check if all parent question marks are equal to sum of their child question marks
            let allowProceed = true;
            subjectivesLocal.forEach((subjective) => {
              if (
                subjective.child_question &&
                subjective.child_question.length > 0
              ) {
                let sum = 0;
                subjective.child_question.forEach((child) => {
                  sum += child.marks;
                });
                if (sum !== subjective.marks) {
                  alert(
                    `Question ${subjective.questionnumber}'s marks are less than the sum of its marks.`
                  );
                  allowProceed = false;
                }
              }
            });

            if (allowProceed) {
              updateMarks();
            }
          }}
        >
          Save and Proceed
        </button>}
      </div>

      {subjectivesLocal.length > 0 && (
        <>
          <h1 className="text-2xl font-bold mt-10">Subjective Question</h1>

          <table className="w-full mt-6 text-left table-collapse">
            <thead>
              <tr>
                <th className="px-4">Q#</th>
                <th className="px-4">Part</th>
                <th className="px-4 py-2 w-1/3">Question</th>
                <th className="px-4 py-2">Answer</th>
                {/* <th className="px-4 py-2">Parent Question</th> */}
                <th className="px-4 py-2">Difficulty</th>
                <th className="px-4 py-2">Topic</th>
                <th className="px-4 py-2">Authority</th>
                <th className="px-4 py-2">Marks</th>
                <th className="px-4 py-2">Edit</th>
                {btn_call === "Generate Random Paper" && 
                <th className="px-4 py-2">Select</th>} 
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {subjectivesLocal
                // .sort((a, b) => a.questionnumber - b.questionnumber)
                .map((subjective, index) => (
                  <React.Fragment key={subjective.sq_id}>
                    <tr
                      className={` border
              ${
                subjective.child_question &&
                subjective.child_question.length > 0 &&
                "border border-b-0"
              }
              ${subjective.highlight && "bg-blue-50"}
              `}
                    >
                      <td className="px-6">{index+1}</td>
                      <td className="px-6"></td>
                      <td className="px-4 py-2">{subjective.question}</td>
                      {/* cut answer short and show ... */}
                      <td className="px-4 py-2">{subjective.answer?.slice(0, 20)}...</td>
                      {/* <td className="px-4 py-2">
                        {subjective.parent_sq_id?.question}
                      </td> */}
                      <td className="px-4 py-2 text-center">{subjective.difficulty}</td>
                      <td className="px-4 py-2 text-center">{subjective.topic}</td>
                      <td className="px-4 py-2 text-center">{subjective.authority}</td>
                      <td className="px-4 py-2 text-center">{subjective.marks}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={handleEditMCQ(subjective)}
                          className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white transition-colors"
                        >
                          <MdEdit />
                        </button>
                      </td>
                      {btn_call === "Generate Random Paper"  &&
                      <td className="px-4 py-2 text-center">
                        <input type="checkbox" onClick={() => {handleSelectMCQ(index)}} checked={subjective.checked}/>
                      </td>}
                      <td className="px-4 py-2">
                        <button
                          onClick={() => {
                            btn_call === "Create Question" 
                            ? handleDeleteSubjective(subjective.id) 
                            : handleDeleteSubjective(subjective.sq_id);
                          }}
                          className="bg-white text-red-600 p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                    {subjective.child_question
                      ?.sort((a, b) => a.questionnumber - b.questionnumber)
                      .map((child, index) => (
                        <tr
                          key={child.sq_id}
                          className={`border-x ${
                            index === subjective.child_question.length - 1 &&
                            "border-b"
                          }`}
                        >
                          <td className="pl-2"></td>
                          <td className="pl-2">
                            {integerToAlphabet(child.questionnumber)}
                          </td>
                          <td className="px-4 py-1">{child.question}</td>
                          <td className="px-4 py-1">{subjective.question}</td>
                          <td className="px-4 py-1">{child.marks}</td>
                          <td className="px-4 py-1">
                            <button
                              onClick={handleEditMCQ(child)}
                              className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white transition-colors"
                            >
                              <MdEdit />
                            </button>
                          </td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => {
                                handleDeleteSubjective(
                                  child.sq_id,
                                  subjective,
                                  true
                                );
                              }}
                              className="bg-white text-red-600 p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                            >
                              <MdDelete />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </>
      )}
      {!control && control_2 && !editing &&<button
        onClick={handleRegenQuestions}
        className="mt-12 bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Regenerate Selected Questions
      </button>}
    </div>
  );
};

export default SubjectiveExam;
