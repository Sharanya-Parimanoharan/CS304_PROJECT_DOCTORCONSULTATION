import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import {Button} from '@mui/material';

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};

function FeedbackPage() {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const s=0;
  const starss = Array(5).fill(0);
  const[tex,setTex]=useState('');

  const handleClick = (value) => {
    setCurrentValue(value);
    console.log(currentValue);
    console.log(tex);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

 
  const add=()=>{
    axios.get(`http://localhost:8081/patient/${window.sessionStorage.id}`).then((response)=>{
      axios.post('http://localhost:8081/feedback',{
        stars:currentValue,
        message:tex,
        patient:response.data
      })
    })
    
   // window.location.reload();
  }
  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  return (
    <div style={styles.container}>
      <h2> Give Your Feedback </h2>
      <div style={styles.starss}>
        {starss.map((_, index) =>{
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          );
        })}
      </div>
      <textarea placeholder="What's your experience?" style={styles.textarea} value={tex} onChange={(e)=>{setTex(e.target.value)}} />

      <Button style={styles.button} onClick={add}>Submit</Button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row"
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 170,
    width: 350
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10
  }
};

export default FeedbackPage;
