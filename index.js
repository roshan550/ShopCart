function handleFormSubmit(event) {
    event.preventDefault();
    const amount=event.target.amount.value;
    const discription=event.target.discription.value;
    const category=event.target.category.value;
  
    const obj={
      amount,
      discription,
      category
    }
    axios.post("https://crudcrud.com/api/0da4a0132c6c496a87dac20e50ae0686/cartData",obj)
    .then((res)=>{
      showUserOnScreen(res.data)
      console.log(res)
    })
    .catch((err)=>{
                  document.body.innerHTML=document.body.innerHTML+"<h4>something went wrong</h4>"
          console.log(err)
    })
    
  }
  window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/0da4a0132c6c496a87dac20e50ae0686/cartData")
    .then((res)=>{console.log(res)
                 for(var i=0;i<res.data.length;i++){
                   showUserOnScreen(res.data[i])
                 }})
    .catch((err)=>console.log(err))
  })
  function showUserOnScreen(user){
    document.getElementById('amount').value='',
    document.getElementById('discription').value='',
    document.getElementById('category').value=''
  
      if(localStorage.getItem(user.discription)!=null){
      removeUserFromScreen(user._id,user.category)
      }
      
    const parentNode=document.getElementById(user.category)
    const childHTML=`<li id=${user._id}> ${user.amount}-${user.discription}-${user.category}
                     <button onclick=deleteUser('${user._id}','${user.category}')>Delete</button>
                      <button onclick=editUserDetails('${user.amount}','${user.discription}','${user.category}','${user._id}')>Edit</button>
                     </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;
  } 
  function editUserDetails(amount,discription,category,userId){
     document.getElementById('amount').value=amount,
    document.getElementById('discription').value=discription,
    document.getElementById('category').value=category,
      removeUserFromScreen(userId,category)
       deleteUser(userId,category)
  }
  function deleteUser(userId,category){
    axios.delete(`https://crudcrud.com/api/0da4a0132c6c496a87dac20e50ae0686/cartData/${userId}`)
    .then((res)=>{removeUserFromScreen(userId,category)
    console.log(res)})
    .catch((err)=>{console.log(err)})
  }
  function removeUserFromScreen(userId,category){
   
    const parentNode=document.getElementById(category)
    const childNode=document.getElementById(userId)
    if(childNode){
      parentNode.removeChild(childNode)
    }
  }