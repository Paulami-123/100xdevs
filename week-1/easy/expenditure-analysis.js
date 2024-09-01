/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {

  let transactionMap = new Map();

  for(let i=0; i<transactions.length; i++){
    let category = transactions[i].category;
    let price = transactions[i].price;
    if(!transactionMap.has(category)){
      transactionMap.set(category, price)
    }
    else{
      transactionMap.set(category, transactionMap.get(category)+price);
    }
  }

  let ans = [];

  transactionMap.forEach((value, key)=>{                 
    ans.push({category : key, totalSpent : value});
  });

  return ans;

}

module.exports = calculateTotalSpentByCategory;
