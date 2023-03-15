document.querySelector('#swallet-form').addEventListener('submit',function (e){
// event type submit and an listener which is a function. and there will be an event parameter to prevent the default behave\

e.preventDefault();

//console.log('submitted!!');

const type = document.querySelector('.add__type').value;
const desc = document.querySelector('.add__description').value;
const value = document.querySelector('.add__value').value;

if(desc.length>0 && value.length>0)
{
    addItems(type,desc,value);
    resetForm();
}
//console.log(type,desc,value);

});


//UI functions

function resetForm()
{
    document.querySelector('.add__type').value = '+';
    document.querySelector('.add__description').value = '';
    document.querySelector('.add__value').value = '';
}

function addItems(type,desc,value)
{
    const time = getFormattedTime();
    const newHtml = `
<div class="item">
    <div class="item-description-time">
        <div class="item-description">
            <p>${desc}</p>
        </div>
        <div class="item-time">
            <p>${time}</p>
        </div>
    </div>
    <div class="item-amount ${type === '+' ?'income-amount':'expense-amount'}">
        <p>${type}$${value}</p>
    </div>
</div>
`;
//console.log(newHtml);

const collection = document.querySelector('.collection');
collection.insertAdjacentHTML('afterbegin',newHtml);

}


//utility functions

function getFormattedTime()
{

    const now = new Date().toLocaleTimeString('en-us',{
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    
    const year = new Date().getFullYear();
    const date = now.split(',')[0].split(' ');
    const time = now.split(',')[1];
    return `${date[1]} ${date[0]},${time},${year}`;
    
}
//console.log(now1.toLocaleTimeString('en-us'));