const createAutoComplete = ({
  root,
   renderOpt,
    onOptionSelect,
     inputValue,
      fetchData})=>{
  
root.innerHTML = `
<label><b>Search For a Movie</b></label>
 <input class="input" />
 <div class="dropdown">
 <div class="dropdown-menu">
 <div class="dropdown-content results"></div>
</div>
</div>
`;


const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');


const onInput = async event =>{
const items = await fetchData(event.target.value);
// console.log(items);

//for closing dropdown when there is nothing
if(!items.length){
  dropdown.classList.remove('is-active');
  return;
}



//for clearing dropdown search
resultsWrapper.innerHTML = '';

//a dropdown activating snippet
dropdown.classList.add('is-active')

//creating a loop to access movie from movies with poster

for(let item of items){
  const option = document.createElement('a');
  
 
  option.classList.add('dropdown-item');
  option.innerHTML = ''
  option.innerHTML = renderOpt(item)

//for closing dropdown and click the movie option and update that in input
 option.addEventListener('click', (event)=>{
   dropdown.classList.remove('is-active');
   input.value = inputValue(item)
   onOptionSelect(item)
 })

  resultsWrapper.appendChild(option)

}
}

input.addEventListener('input',debounce(onInput,500))

//for closing dropdown by  clicking out of search
document.addEventListener('click', (event)=>{
 if(!root.contains(event.target)){ //if the event click is not happening in root element then close the dropdown.
   dropdown.classList.remove('is-active');
 }
})

}