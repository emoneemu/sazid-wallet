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

showItems();
showTotalIncome();
showTotalExpense();
showTotalBalance();

//ALL THE FUNCTIONS ARE HERE

//UI functions

function resetForm()
{
    document.querySelector('.add__type').value = '+';
    document.querySelector('.add__description').value = '';
    document.querySelector('.add__value').value = '';
}

function getItemsfromLS()
{
    let items = localStorage.getItem('items');

    if(items)
    {
        items = JSON.parse(items);
    }
    else
    {
        items = [];
    }
    return items;
}

function showItems()
{
    let items = getItemsfromLS();
    const collection = document.querySelector('.collection');
    
    
    for(let item of items)
    {
        const newHtml = `
            <div class="item">
                <div class="item-description-time">
                    <div class="item-description">
                        <p>${item.desc}</p>
                    </div>
                    <div class="item-time">
                        <p>${item.time}</p>
                    </div>
                </div>
                <div class="item-amount ${item.type === '+' ?'income-amount':'expense-amount'}">
                    <p>${item.type}$${item.value}</p>
                </div>
            </div>
            `;
    collection.insertAdjacentHTML('afterbegin',newHtml);
    }
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

addItemsToLS(desc,time,type,value);

showTotalExpense();
showTotalIncome();
showTotalBalance();

}

function addItemsToLS(desc,time,type,value)
{
    let items = getItemsfromLS();
    items.push({desc,time,type,value});

    localStorage.setItem  ('items',JSON.stringify(items));

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

function showTotalIncome()
{
    let items = getItemsfromLS();
    let totalincome = 0;
    for(let item of items)
    {
        if(item.type==='+')
        {
            totalincome += parseInt(item.value);
        }
    }
    document.querySelector('.income__amount').innerHTML=`$${totalincome}`;
    return totalincome;
}

function showTotalExpense()
{
    let items = getItemsfromLS();
    let totalincome2 = 0;
    for(let item of items)
    {
        if(item.type === '-')
        {
            totalincome2 += parseInt(item.value);
        }
    }
    document.querySelector('.expense__amount').innerHTML=`$${totalincome2}`;
    return totalincome2;
}

function showTotalBalance()
{
    let totalBalance = showTotalIncome()-showTotalExpense();
    if (totalBalance>=0)
    {
        document.querySelector('header').className = 'green';
    }
    else
    {
        document.querySelector('header').className = 'red';
    }
    document.querySelector('.balance__amount').innerHTML=`$${totalBalance}`;
    

}
console.log(showTotalIncome());
console.log(showTotalExpense());


//Using filter and reduce method to calculate the income expense and total

//let totalincome = items.filter((item)=>item.type==='+').reduce((income,item)=>income+parseInt(item.value),0);
//let totalexpense = items.filter((item)=>item.type==='-').reduce((expense,item)=>expense+parseInt(item.value),0);
