import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { ImCross } from "react-icons/im";
import Input from "../Common/Form/Input";
import MultiSelectDropdown from "./MultiSelect";
import NewQuestionInput from "./NewQuestionInput";
import NoOfQuestions from "./NoOfQuestions";
import { useRouter } from "next/router";
import Spinner from "../Loader/Spinner";
import Link from "next/link";

const MCQTable = ({
  exam,
  setExam,
  paperId,
  setActive,
  objective_questions,
  setObjectiveQuestions,
  freeFlow,
  btn_call,
  fetchObjectives
}) => {
  console.log("in mcq table, btn_call: ", btn_call)
  console.log("in mcq table, paperId: ", paperId)
  console.log("in mcq table, objective_questions: ", objective_questions)

  const [difficultys, setDifficultys] = useState(["", "Easy", "Medium", "Hard"])
  const [topics, setTopics] = useState([""])
  const [subjects, setSubjects] = useState([""])
  const [courses, setCourses] = useState([""])
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")

  const [loading, setLoading] = useState({});
  const [multipleOptions, setMultipleOptions] = useState(false);
  const [index, setIndex] = useState(null);
  const [mcqs, setMCQs] = useState(
    objective_questions.map((mcq) => {
      // console.log("mcq in map: ", mcq)
      mcq.options = mcq.answers.split(",");
      return mcq;
    })
  );

  const [currentMCQ, setCurrentMCQ] = useState({
    question: "",
    options: ["", "", "", ""],
    correct_answer: "",
    marks: 1,
    timeAllowed: 60,
    difficulty: "",
    course: "",
    subject: "",
    topic: "",
    type: "objective",
    checked: false
  });
  const specialSequence="###"

  const [randomPaperConfig, setRandomPaperConfig] = useState({
    no_of_easy: "",
    no_of_medium: "",
    no_of_hard: "",
    course: "",
    subject: "",
    topic: "",
    type: "objective"
  })

  const [control, setControl] = useState(false)
  const [prevMCQsID, setPrevMCQsID] = useState([])
  const [control_2, setControl_2] = useState(false)

  useEffect(() => {
    if (mcqs.length === 0) {
      setMCQs(
        objective_questions.map((mcq) => {
          mcq.options = mcq.answers.split(",");
          return mcq;
        })
      );
    }
  }, [objective_questions]);
  // console.log(mcqs)
  useEffect(() => {
    if (
      currentMCQ.correct_answer &&
      currentMCQ.correct_answer.split(",").length > 1
    ) {
      const hasMultiple = currentMCQ.correct_answer.split(",").length > 1;
      setMultipleOptions(true);
    }
  }, [currentMCQ]);

  const router = useRouter();

  const editExam = () => {
    router.push({
      pathname: `/faculty/create_exam/${
        exam.paper_type === "Objective" ? "objective" : "subjective"
      }`,
      query: {
        paper_id: exam.paper_id,
        is_edit: true,
      },
    });
  };

  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  console.log(editing, "editing");
  const handleMultipleOptionsChange = (e) => {
    setMultipleOptions(e.target.checked);
  };


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
      : setCurrentMCQ({...currentMCQ, ["course"]: selectedCourse})
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
      : setCurrentMCQ({...currentMCQ, ["subject"]: selectedSubject})
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
      : setCurrentMCQ({...currentMCQ, ["topic"]: selectedTopic})
    }
  }, [selectedTopic])

  useEffect(() => {
    if (selectedDifficulty !== "" && selectedDifficulty !== undefined) {
      console.log("selectedDifficulty: ", selectedDifficulty)
      setCurrentMCQ({...currentMCQ, ["difficulty"]: selectedDifficulty})
    }
  }, [selectedDifficulty])

  useEffect(() => {
    console.log("in useEffect, currentMCQ: ", currentMCQ)
  }, [currentMCQ])

  useEffect(() => {
    console.log("in useEffect, randomPaperConfig: ", randomPaperConfig)
  }, [randomPaperConfig])


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
        // handleCourseInput(event)
        // handleNewQustionInputChange(event)
      }
      else if(event.target.id === "subject"){
        setSelectedSubject(event.target.value)
        // handleNewQustionInputChange(event)
      }
      else if(event.target.id === "topic"){
        setSelectedTopic(event.target.value)
        // handleNewQustionInputChange(event)
      }
      else if(event.target.id === "difficulty"){
        setSelectedDifficulty(event.target.value)
        // handleNewQustionInputChange(event)
      }
      console.log("in handleSelect, currentMCQ: ", currentMCQ)
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
    console.log("in handleNewQustionInputChange => ID: ", id)
    console.log("in handleNewQustionInputChange => VALUE: ", value)
    {btn_call === "Generate Random Paper" 
    ? setRandomPaperConfig({...randomPaperConfig, [id]: value})
    : setCurrentMCQ({...currentMCQ, [id]: value})}
    console.log("in handleNewQustionInputChange -> currentMCQ: ", currentMCQ)
    console.log("in handleNewQustionInputChange -> randomPaperConfig: ", randomPaperConfig)
  }


  const handleQuestionChange = (e) => {
    setCurrentMCQ({ ...currentMCQ, question: e.target.value });
  };

  const handleOptionChange = (index) => (e) => {
    const newOptions = [...currentMCQ.options];
    newOptions[index] = e.target.value.replace(/,/g, specialSequence);
    //if edited mcq is correct anser, then we need to update correct answer
    if (currentMCQ.correct_answer === currentMCQ.options[index]) {
      setCurrentMCQ({
        ...currentMCQ,
        options: newOptions,
        correct_answer: e.target.value.replace(/,/g, specialSequence),
      });
    }
    else {
      setCurrentMCQ({
        ...currentMCQ,
        options: newOptions,
      });
    }
  };

  const handleCorrectOptionChange = (e) => {
    setCurrentMCQ({ ...currentMCQ, correct_answer: e.target.value });
  };

  const handleMarksChange = (e) => {
    setCurrentMCQ({ ...currentMCQ, marks: parseInt(e.target.value) });
  };

  const handleOptionAddition = () => {
    setCurrentMCQ({ ...currentMCQ, options: [...currentMCQ.options, ""] });
  };

  const handleOptionDeletion = (index) => () => {
    const newOptions = [...currentMCQ.options];
    newOptions.splice(index, 1);
    setCurrentMCQ({ ...currentMCQ, options: newOptions });
  };

  const handleTimeAllowedChange = (e) => {
    setCurrentMCQ({ ...currentMCQ, timeAllowed: parseInt(e.target.value) });
  };

  async function addQuestion(i, question){
    // console.log("["+i+"] - " + "current question in addQuestion: ", question)

    try {
      const newMCQ = await axios.post(
        "/api/faculty/paper_creation/add_objective",
        {
          btn_call,
          question_info: {paper_id: paperId,
          question: question.question,
          // answers: question.options.toString(),
          answers: question.answers,
          correct_answer: question.correct_answer,
          marks: question.marks,
          timeAllowed: question.timeAllowed || 60,
          difficulty: question.difficulty,
          course: question.course,
          subject: question.subject,
          topic: question.topic,
          type: question.type}
        }
      );
      // console.log("["+i+"] - " + "got response of addMCQ:", newMCQ.data)
      
      newMCQ.data.options = newMCQ.data.answers.split(",");
      setMultipleOptions(false);

      setCurrentMCQ({
        question: "",
        options: ["", "", "", ""],
        correct_answer: "",
        marks: 1,
        timeAllowed: currentMCQ.timeAllowed || 60,
        difficulty: "",
        course: "",
        subject: "",
        topic: "",
        type: "objective",
        checked: false
      });
      return newMCQ.data

    } catch (err) {
      console.log("err: ", err);
      setLoading({
        error: "Error in Adding Question.",
      });
    }
  }

  const deleteCurrentQuestions = async(mcqs_ids_array) => {
    try{
      console.log("mcqs in deleteCurrentQuestions: ", mcqs_ids_array)
      const res = await axios.post("/api/faculty/remove_objective", {
        flag: "deleteCurrentQuestions",
        mcqs_ids_array: mcqs_ids_array
      });
    }
    catch (err) {
      console.log("err: ", err);
      setLoading({error: "Error in Deleting current Question."})
    }
  }

  function handleSelectMCQ(input_index){
    console.log("input_index: ", input_index)
    // const checkedMCQs = mcqs.map((mcq, index) => {index === input_index ? !mcq.checked : mcq})
    const checkedMCQs = [...mcqs]
    console.log("checkedMCQs in handleSelectMCQ: ", checkedMCQs)
    checkedMCQs[input_index].checked = !checkedMCQs[input_index].checked
    // console.log("checkedMCQs: ", checkedMCQs)
    setMCQs(checkedMCQs)
  }

  async function handleRegenQuestions(){
    console.log("ids of current questions: ", prevMCQsID)
    console.log("mcqs: ", mcqs)
    console.log("oq_ids of current questions: ", mcqs.map((mcq) => {return mcq.oq_id}))
    const mcqs_to_regen = mcqs.filter((mcq) => {return mcq.checked === true})
    const mcqs_to_regen_oq_ids = mcqs_to_regen.map((mcq) => {return mcq.oq_id})
    
    console.log("mcqs_to_regen: ", mcqs_to_regen)
    console.log("mcqs_to_regen_oq_ids: ", mcqs_to_regen_oq_ids)

    if (mcqs_to_regen.length === 0) {
      alert("No questions selected to regenerate");
      return;
    }
    else{
      setLoading({
        message: "Regenerating selected questions",
      });

      let indexes = []
      let mcqs_to_regen_ids = []
      for (let i = 0; i < mcqs_to_regen.length; i++){
        indexes = [...indexes, mcqs.indexOf(mcqs_to_regen[i])]
        mcqs_to_regen_ids = [...mcqs_to_regen_ids, prevMCQsID[indexes[indexes.length-1]]]
      }

      console.log("indexes: ", indexes)
      console.log("mcqs_to_regen_ids: ", mcqs_to_regen_ids)
      
      deleteCurrentQuestions(mcqs_to_regen_oq_ids)
      const new_mcqs = [...mcqs]
      const rest_ids = [...prevMCQsID]
      for(let i = 0; i < indexes.length; i++){
        new_mcqs.splice(indexes[i]-i, 1)
        rest_ids.splice(indexes[i]-i, 1)
      }

      try{
        const res = await axios.post("/api/paper/get_questions_databank", {randomPaperConfig, prevMCQsID, flag: "regen", mcqs_to_regen_ids})
        console.log("res from get_questions_databank in regen: ", res.data)
        console.log("mcqs in regen: ", mcqs)
        console.log("objective_questions in regen: ", objective_questions)
  
        let ids_array = [...rest_ids]
        let mcqs_array = [...new_mcqs]
        let mmcq;
  
        for (let i = 0; i < res.data.length; i++) {
          ids_array = [...ids_array, res.data[i].id]
          mmcq = addQuestion(i, res.data[i])
          mcqs_array = [...mcqs_array, mmcq]
        }
        const resolvedMcqs = await Promise.all(mcqs_array);
        console.log("mcqs_array: ", resolvedMcqs)
        resolvedMcqs.map((mcq) => {mcq.checked = false})
        console.log("mcqs_array after adding checked: ", resolvedMcqs)
        setPrevMCQsID(ids_array)
        setMCQs(resolvedMcqs);
        setObjectiveQuestions(resolvedMcqs);
        console.log("ids of current questions: ", ids_array)
  
        setLoading({
          show: false,
          message: "",
        });
  
      }
      catch (err) {
        console.log("err: ", err);
        setLoading({error: "Error in regenerating Question."})
      }
    }

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

    setLoading({
      message: "Fetching questions from Data Bank",
    });

    let mcqs_ids_array = []
    for(let i = 0; i < mcqs.length; i++){
      mcqs_ids_array = [...mcqs_ids_array, mcqs[i].oq_id]
    }
    console.log("mcqs_ids_array: ", mcqs_ids_array)
    if (mcqs_ids_array.length > 0) {deleteCurrentQuestions(mcqs_ids_array)}

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
      console.log("mcqs_array: ", resolvedMcqs)
      resolvedMcqs.map((mcq) => {mcq.checked = false})
      console.log("mcqs_array after adding checked: ", resolvedMcqs)
      setPrevMCQsID(ids_array)
      setMCQs(resolvedMcqs);
      setObjectiveQuestions(resolvedMcqs);
      console.log("ids_array: ", ids_array)

      setLoading({
        show: false,
        message: "",
      });

      setAdding(false);
      setControl(false);
      setControl_2(true);
      reset()
    }
    catch (err) {
      console.log("err: ", err);
      setLoading({error: "Error in Fetching Question."})
    }
  }

  const handleAddMCQ = async () => {
    console.log("inside handleAddMCQ")
    if (
      currentMCQ.question === "" ||
      currentMCQ.options.includes("") ||
      currentMCQ.correct_answer === "" ||
      currentMCQ.marks === "" ||
      (!freeFlow && !currentMCQ.timeAllowed)
    ) {
      alert("Please fill all the fields");
      return;
    }

    if(btn_call === "Create Question"){
      if (
        currentMCQ.difficulty === "" ||
        currentMCQ.course === "" ||
        currentMCQ.subject === "" ||
        currentMCQ.topic === ""
      ) {
        alert("Please fill all the fields");
        return;
      }
    }

    if (currentMCQ.options.length !== new Set(currentMCQ.options).size) {
      alert("Please remove duplicate options, and reselect correct option.");
      return;
    }

    setLoading({
      message: "Adding Question",
    });

    try {
      const newMCQ = await axios.post(
        "/api/faculty/paper_creation/add_objective",
        {
          btn_call,
          question_info: {paper_id: paperId,
          question: currentMCQ.question,
          answers: currentMCQ.options.toString(),
          correct_answer: currentMCQ.correct_answer,
          marks: currentMCQ.marks,
          timeAllowed: currentMCQ.timeAllowed || 60,
          difficulty: currentMCQ.difficulty,
          course: currentMCQ.course,
          subject: currentMCQ.subject,
          topic: currentMCQ.topic,
          type: currentMCQ.type}
        }
      );
      console.log("got response of addMCQ:", newMCQ)
      setLoading({
        show: false,
        message: "",
      });
      newMCQ.data.options = newMCQ.data.answers.split(",");
      setMultipleOptions(false);
      setMCQs([...mcqs, newMCQ.data]);
      btn_call === "Create Question" ? "" : setObjectiveQuestions([...mcqs, newMCQ.data]);
      setCurrentMCQ({
        question: "",
        options: ["", "", "", ""],
        correct_answer: "",
        marks: 1,
        timeAllowed: currentMCQ.timeAllowed || 60,
        difficulty: "",
        course: "",
        subject: "",
        topic: "",
        type: "objective",
        checked: false
      });
      setAdding(false);
      reset()
    } catch (err) {
      console.log("err: ", err);
      setLoading({
        error: "Error in Adding Question.",
      });
    }
  };

  const handleEditMCQ = (index) => () => {
    if (!editing && !adding) {
      setEditing(true);
      setIndex(index);
      setCurrentMCQ(mcqs[index]);
      // scroll to top
      window.scrollTo(0, 0);
      //if edited mcq is correct anser, then we need to update correct answer
      console.log(mcqs[index], "aaaa");
    } else {
      alert(
        "Please save or cancel the current edit or add operation before editing another question."
      );
    }
  };

  const handleUpdateMCQ = async (index) => {
    if (
      currentMCQ.question === "" ||
      currentMCQ.options.includes("") ||
      currentMCQ.correct_answer === "" ||
      currentMCQ.marks === "" ||
      (!freeFlow && !currentMCQ.timeAllowed)
    ) {
      alert("Please fill all the fields");
      return;
    }

    if(btn_call === "Create Question"){
      if (
        currentMCQ.difficulty === "" ||
        currentMCQ.course === "" ||
        currentMCQ.subject === "" ||
        currentMCQ.topic === ""
      ) {
        alert("Please fill all the fields");
        return;
      }
    }

    if (currentMCQ.options.length !== new Set(currentMCQ.options).size) {
      alert("Please remove duplicate options, and reselect correct option.");
      return;
    }

    setLoading({
      message: "Updating Question",
    });

    console.log("currentMCQ in edit question: ", currentMCQ );
    const newMCQ = await axios.post("/api/faculty/edit_objective", {
      btn_call,
      question_info:{
        oq_id: mcqs[index].oq_id,
        id: mcqs[index].id,
        paper_id: paperId,
        question: currentMCQ.question,
        answers: currentMCQ.options.toString(),
        correct_answer: currentMCQ.correct_answer,
        marks: currentMCQ.marks,
        timeAllowed: currentMCQ.timeAllowed || 60,
        difficulty: currentMCQ.difficulty,
        course: currentMCQ.course,
        subject: currentMCQ.subject,
        topic: currentMCQ.topic
      }
    });

    console.log(newMCQ.data, "newMCQ");
    console.log("index: ", index)

    if (newMCQ.status === 200) {
      setLoading({});
      const newMCQs = [...mcqs];
      if(btn_call !== "Generate Random Paper"){
        const newWithOptions = {
          options: newMCQ.data.answers.split(","),
          ...newMCQ.data,
        };
        newMCQs[index] = newWithOptions;
      }
      else if(btn_call === "Generate Random Paper"){
        newMCQs[index] = newMCQ.data;
      }

      
      // const newWithOptions = {
      //   options: newMCQ.data.answers.split(","),
      //   ...newMCQ.data,
      // };
      // newMCQs[index] = newWithOptions;
      

      console.log("newMCQs in edit: ", newMCQs)
      setMCQs(newMCQs);
      console.log("new mcqs after edit: ", mcqs)
      btn_call === "Create Question" ? "" : setObjectiveQuestions(newMCQs);
      console.log("objective_questions after edit: ", objective_questions)
      // setObjectiveQuestions(newMCQs);
      setMultipleOptions(false);
      setCurrentMCQ({
        question: "",
        options: ["", "", "", ""],
        correct_answer: "",
        marks: 1,
        timeAllowed: currentMCQ.timeAllowed || 60,
        difficulty: "",
        course: "",
        subject: "",
        topic: "",
        type: "objective",
        checked: false
      });
      setEditing(false);
      setIndex(null);
    } else {
      setLoading({
        error: "Error in Updating Question.",
      });
    }
  };

  const handleDeleteMCQ = async (index) => {
    setLoading({
      message: "Deleting Question",
    });

    const res = await axios.post("/api/faculty/remove_objective", {
      btn_call,
      oq_id: mcqs[index].oq_id,
      id: mcqs[index].id
    });

    if (res.status === 200) {
      setLoading({});
      const newMCQs = [...mcqs];
      newMCQs.splice(index, 1);
      setMCQs(newMCQs);
      btn_call === "Create Question" || btn_call === "Generate Random Paper" ? "" : setObjectiveQuestions(newMCQ);
      // setObjectiveQuestions(newMCQs);
    } else {
      setLoading({
        error: "Error in Deleting Question.",
      });
    }
  };

  const updateMarks = () => {
    const totalMarks = mcqs.reduce((total, mcq) => total + mcq.marks, 0);
    if (totalMarks !== exam.objective_marks) {
      setLoading({
        message: "Saving...",
      });

      axios
        .post("/api/paper/update_total_marks", {
          paper_id: exam.paper_id,
          add_marks: totalMarks,
          is_objective: true,
        })
        .then((res) => {
          console.log("Marks added in total ", res.data.total_marks);

          setExam({
            ...exam,
            total_marks: res.data.total_marks,
            objective_marks: res.data.objective_marks,
          });
          setActive(3);

          setLoading({});
        })
        .catch((err) => {
          console.log("Error in update_total_marks", err);
          setLoading({
            error: "Error in Saving.",
          });
        });
    } else {
      setActive(3);
    }
  };

  return (
    <div className="flex font-poppins flex-col items-center p-6">
      <Spinner loading={loading} />

      <div className="w-3/12 flex flex-col justify-center gap-y-4">
        {!control && <button
          onClick={() => {
            if (!adding && !editing) {
              if (btn_call === "Generate Random Paper"){
                getCoursesList()
                setControl(true)
              }
              else{
                getCoursesList()
                setAdding(true);
              }
            } else {
              alert(
                "Please save or cancel the current edit or add operation before editing another question."
              );
            }
          }}
          className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {btn_call === "Generate Random Paper" ? "Load MCQs from Data Bank" : "Add MCQ"}
        </button>}
        
        {!control && control_2 && <button
          onClick={handleRegenQuestions}
          className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Regenerate Selected Questions
        </button>}

      </div>

      {control && 
      <div className="w-full p-10 bg-slate-100 mt-6 rounded-2xl flex flex-col justify-center">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">
            Add MCQs
          </h2>
          <div className="rounded-full text-white bg-red-500 my-auto flex justify-between items-center p-2 cursor-pointer">
            <button
              onClick={() => {
                setEditing(false);
                setAdding(false);
                setControl(false)
                setCurrentMCQ({
                  question: "",
                  options: ["", "", "", ""],
                  correct_answer: "",
                  marks: 1,
                  timeAllowed: currentMCQ.timeAllowed || 60,
                  difficulty: "",
                  course: "",
                  subject: "",
                  topic: "",
                  type: "objective"
                })
                setRandomPaperConfig({
                  no_of_easy: "",
                  no_of_medium: "",
                  no_of_hard: "",
                  course: "",
                  subject: "",
                  topic: "",
                  type: "objective"  
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
          {/* <NewQuestionInput label={"Course"} options={["", "C1", "C2", "C3", "C4"]} id={"course"} handleChange={handleNewQustionInputChange} value={randomPaperConfig.course} btn_call={btn_call}/>
          <NewQuestionInput label={"Subject"} options={["", "ABC", "EFG", "HIJ"]} id={"subject"} handleChange={handleNewQustionInputChange} value={randomPaperConfig.subject} btn_call={btn_call}/>
          <NewQuestionInput label={"Topic"} options={["", "T1", "T2", "T3", "T4", "T5", "T6", "T7"]} id={"topic"} handleChange={handleNewQustionInputChange} value={randomPaperConfig.topic} btn_call={btn_call}/> */}
          
          {/* <NewQuestionInput label={"Difficulty"} options={difficultys} id={"difficulty"} handleChange={(e)=>handleSelect(e)} value={selectedDifficulty} btn_call={btn_call}/> */}
          <NewQuestionInput label={"Course"} options={courses} id={"course"} handleChange={(e)=>handleSelect(e)} value={selectedCourse} btn_call={btn_call}/>
          <NewQuestionInput label={"Subject"} options={subjects} id={"subject"} handleChange={(e)=>handleSelect(e)} value={selectedSubject} btn_call={btn_call}/>
          <NewQuestionInput label={"Topic"} options={topics} id={"topic"} handleChange={(e)=>handleSelect(e)} value={selectedTopic} btn_call={btn_call}/>
        </div>

        <button 
        className="mt-5 bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700 w-48 self-center"
        onClick={handleGetQuestions}>
          Get Questions
        </button>
        
      </div>}

      {(editing || adding) && (
        <div className="w-full p-10 bg-slate-100 mt-6 rounded-2xl ">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit" : "Add"} MCQ
            </h2>
            <div className="rounded-full text-white bg-red-500 my-auto flex justify-between items-center p-2 cursor-pointer">
              <button
                onClick={() => {
                  setEditing(false);
                  setAdding(false);
                  setCurrentMCQ({
                    question: "",
                    options: ["", "", "", ""],
                    correct_answer: "",
                    marks: 1,
                    timeAllowed: currentMCQ.timeAllowed || 60,
                    difficulty: "",
                    course: "",
                    subject: "",
                    topic: ""
                  });
                }}
              >
                <ImCross />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <Input
              text={"Question"}
              required
              value={currentMCQ.question}
              onChange={handleQuestionChange}
            />
          </div>
          <div className="">
            <label className="block mb-2">Options</label>
            <div className="grid grid-cols-3 w-full gap-x-5">
              {currentMCQ.options.map((option, index) => (
                <div key={index} className="mb-2 ">
                  <input
                    type="text"
                    value={option.replace(specialSequence, ",")}
                    onChange={handleOptionChange(index)}
                    className="bg-white border border-primary-black focus:outline-none focus:border-[#edbd12] border-opacity-[0.15] p-2 rounded-lg w-full"
                  />
                </div>
              ))}
            </div>

            <div className="my-6 flex space-x-8">
              <button
                onClick={handleOptionAddition}
                className="bg-[#FEC703] text-white p-2 rounded hover:bg-[#edbd12]"
              >
                Add Option
              </button>

              <button
                onClick={handleOptionDeletion(currentMCQ.options.length - 1)}
                className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
              >
                Delete Option
              </button>
            </div>
          </div>
          <div className="flex items-center mt-10 mb-2 gap-x-3">
            <label className="block">Allow Multiple Correct Options</label>
            <input
              type="checkbox"
              checked={multipleOptions}
              className="accent-slate-100"
              onChange={handleMultipleOptionsChange}
            />
          </div>
          <div className="flex w-full gap-x-5">
            <div className="mb-10 w-full mt-6">
              <label className="block mb-2">Correct Option</label>
              {multipleOptions ? (
                <MultiSelectDropdown
                  options={currentMCQ.options}
                  setCurrentMCQ={setCurrentMCQ}
                  selected={currentMCQ.correct_answer}
                />
              ) : (
                <select
                  type="text"
                  value={currentMCQ.correct_answer}
                  onChange={handleCorrectOptionChange}
                  className="bg-white p-2 rounded-lg border border-primary-black border-opacity-[0.15] w-full focus:outline-none focus:border-[#FEC703]"
                >
                  <option value="" disabled>
                    Select Correct Option
                  </option>
                  {currentMCQ.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option.replace(specialSequence, ",")}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <Input
              text={"Marks"}
              type={"number"}
              required
              min={1}
              value={currentMCQ.marks}
              onChange={handleMarksChange}
            />
            {/* input for time allowed */}
            {freeFlow ? null : (
              <Input
                text={"Time Allowed in Seconds"}
                type={"number"}
                required
                value={currentMCQ.timeAllowed || 60}
                onChange={handleTimeAllowedChange}
              />
            )}
          </div>

          {btn_call === "Create Question" && <div className="mb-10 gap-x-4 flex justify-between">
            {/* <NewQuestionInput label={"Difficulty"} options={["", "Easy", "Medium", "Hard"]} id={"difficulty"} handleChange={handleNewQustionInputChange} value={currentMCQ.difficulty} btn_call={btn_call}/>
            <NewQuestionInput label={"Course"} options={["", "C1", "C2", "C3", "C4"]} id={"course"} handleChange={handleNewQustionInputChange} value={currentMCQ.course} btn_call={btn_call}/>
            <NewQuestionInput label={"Subject"} options={["", "ABC", "EFG", "HIJ"]} id={"subject"} handleChange={handleNewQustionInputChange} value={currentMCQ.subject} btn_call={btn_call}/>
            <NewQuestionInput label={"Topic"} options={["", "T1", "T2", "T3", "T4", "T5", "T6", "T7"]} id={"topic"} handleChange={handleNewQustionInputChange} value={currentMCQ.topic} btn_call={btn_call}/> */}
            
            <NewQuestionInput label={"Difficulty"} options={difficultys} id={"difficulty"} handleChange={(e)=>handleSelect(e)} value={selectedDifficulty} btn_call={btn_call}/>
            <NewQuestionInput label={"Course"} options={courses} id={"course"} handleChange={(e)=>handleSelect(e)} value={selectedCourse} btn_call={btn_call}/>
            <NewQuestionInput label={"Subject"} options={subjects} id={"subject"} handleChange={(e)=>handleSelect(e)} value={selectedSubject} btn_call={btn_call}/>
            <NewQuestionInput label={"Topic"} options={topics} id={"topic"} handleChange={(e)=>handleSelect(e)} value={selectedTopic} btn_call={btn_call}/>
          </div>}

          {editing ? (
            <button
              onClick={() => {
                handleUpdateMCQ(index);
              }}
              className="bg-blue-800 text-white p-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAddMCQ}
              className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Add
            </button>
          )}
        </div>
      )}
      <div className="mt-10 w-full pr-10 flex justify-end gap-x-5">
        
        {btn_call === "Create Question" ? 
        <Link href="/faculty" className="border-2 border-[#FEC703] hover:bg-[#FEAF03] hover:text-white font-medium text-primary-black rounded-lg py-3 px-8">Back</Link>
        : 
        <button
          type="button"
          className="border-2 border-[#FEC703] hover:bg-[#FEAF03] hover:text-white font-medium text-primary-black rounded-lg py-3 px-8"
          onClick={() => {
            setActive(1);
            editExam();
          }}
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
            updateMarks();
          }}
        >
          Save and Proceed
        </button>}
      </div>
      {mcqs.length > 0 && (
        <>
          <h1 className="text-2xl font-bold mt-10">MCQ Question</h1>

          <table className="w-full mt-6 text-left table-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2">SR#</th>
                <th className="px-4 py-2 w-1/2">Question</th>
                <th className="px-4 py-2 w-1/4">Options</th>
                <th className="px-4 py-2">Correct Option</th>
                <th className="px-4 py-2">Marks</th>
                {freeFlow ? null : <th className="px-4 py-2">Time Allowed</th>}
                <th className="px-4 py-2">Edit</th>
                {btn_call === "Generate Random Paper" 
                ? <th className="px-4 py-2">Select</th> 
                : <th className="px-4 py-2">Delete</th>}
              </tr>
            </thead>
            <tbody>
              {mcqs.map((mcq, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{mcq.question}</td>
                  <td className="px-4 py-2">
                    <ol className="list-[lower-alpha] list-inside">
                      {mcq.options?.map((option, index) => (
                        <li key={index}>{option.replace(specialSequence, ",")}</li>
                      ))}
                    </ol>
                  </td>
                  <td className="px-4 py-2">{mcq.correct_answer.replace(specialSequence, ",")}</td>
                  <td className="px-4 py-2">{mcq.marks}</td>
                  {freeFlow ? null : (
                    <td className="px-4 py-2">{mcq.timeAllowed}</td>
                  )}
                  <td className="px-4 py-2">
                    <button
                      onClick={handleEditMCQ(index)}
                      className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white transition-colors"
                    >
                      <MdEdit />
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    {btn_call === "Generate Random Paper" 
                    ? <input type="checkbox" onClick={() => {handleSelectMCQ(index)}} checked={mcq.checked}/>
                    : <button
                      onClick={() => {
                        handleDeleteMCQ(index);
                      }}
                      className="bg-white text-red-600 p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <MdDelete />
                    </button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MCQTable;
