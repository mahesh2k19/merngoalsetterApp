import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { getGoals, reset } from "../features/goals/goalSlice"
import GoalItem from "../components/GoalItem"


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state)=>state.auth)
  const {goals, isLoaing, isError, message} = useSelector((state)=> state.goals)

  useEffect(() => {
    if(!user){
      navigate("/login")
    }
    else{
     dispatch(getGoals())
    }
    
    if(isError){
    console.log("Error")
    }
    
    return () => {
    dispatch(reset())
    }
    }, [user, message, isError, dispatch, navigate])

  if(isLoaing){
    return <Spinner />
  }

  return (
    <><section className="heading">
      <h1>Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
      </section>
      
      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (<h3>You have not set any goals</h3>)}
      </section>
      
      </>

     
  )
}

export default Dashboard