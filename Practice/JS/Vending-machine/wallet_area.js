const walletBack = document.getElementsByClassName("wallet-back")
const paperMoney = document.getElementsByClassName("money")
const coinMoney = document.getElementsByClassName("coin")

const moneyDetail = [{
  value: 50000,
  number: 1
}, {
  value: 10000,
  number: 2
}, {
  value: 5000,
  number: 4
}, {
  value: 1000,
  number: 6
}, {
  value: 500,
  number: 6
}, {
  value: 100,
  number: 10
}]

//현재 총 현금 구하기
let totalMoney = 0;
let selectedMoney = 0;
const calMoney = () => {
  for (let i = 0; i < moneyDetail.length; i++) {
    totalMoney = totalMoney + moneyDetail[i].number * moneyDetail[i].value
  }
}
calMoney();

//전광판에 현황 표시하기
const show = () => {
  $(".board-1").innerText =
    `다니엘 전재산: ${totalMoney}₩
    \n선택한 돈: ${selectedMoney}₩`
  $(".board-2").innerText =
    `5만원: ${moneyDetail[0].number}개
    \n1만원: ${moneyDetail[1].number}개
    \n5천원: ${moneyDetail[2].number}개
    \n1천원: ${moneyDetail[3].number}개
    \n5백원: ${moneyDetail[4].number}개
    \n1백원: ${moneyDetail[5].number}개`
}
show()

//돈 그리기
const makeMoney50 = () => {
  const makeMoney = document.createElement("div");
  makeMoney.setAttribute("id", "money-50")
  makeMoney.setAttribute("value", 50000)
  makeMoney.setAttribute("class", "money")
  makeMoney.innerText = "50000"
  makeMoney.classList.add("money-50")
  document.getElementsByClassName("wallet-front-a")[0].appendChild(makeMoney)
}
const makeMoney10 = () => {
  const makeMoney = document.createElement("div");
  makeMoney.setAttribute("id", "money-10")
  makeMoney.setAttribute("value", 10000)
  makeMoney.setAttribute("class", "money")
  makeMoney.innerText = "10000"
  makeMoney.classList.add("money-10")
  document.getElementsByClassName("wallet-front-a")[0].appendChild(makeMoney)
}
const makeMoney5 = () => {
  const makeMoney = document.createElement("div");
  makeMoney.setAttribute("id", "money-5")
  makeMoney.setAttribute("value", 5000)
  makeMoney.setAttribute("class", "money")
  makeMoney.innerText = "5000"
  makeMoney.classList.add("money-5")
  document.getElementsByClassName("wallet-front-a")[0].appendChild(makeMoney)
}
const makeMoney1 = () => {
  const makeMoney = document.createElement("div");
  makeMoney.setAttribute("id", "money-1")
  makeMoney.setAttribute("value", 1000)
  makeMoney.setAttribute("class", "money")
  makeMoney.innerText = "1000"
  makeMoney.classList.add("money-1")
  document.getElementsByClassName("wallet-front-a")[0].appendChild(makeMoney)
}
const makeCoin5 = () => {
  const makeMoney = document.createElement("div");
  makeMoney.setAttribute("id", "coin-5")
  makeMoney.setAttribute("value", 500)
  makeMoney.setAttribute("class", "coin")
  makeMoney.innerText = "500"
  makeMoney.classList.add("coin-5")
  document.getElementsByClassName("wallet-back-a")[0].appendChild(makeMoney)
}
const makeCoin1 = () => {
  const makeMoney = document.createElement("div");
  makeMoney.setAttribute("id", "coin-1")
  makeMoney.setAttribute("value", 100)
  makeMoney.setAttribute("class", "coin")
  makeMoney.innerText = "100"
  makeMoney.classList.add("coin-1")
  document.getElementsByClassName("wallet-back-a")[0].appendChild(makeMoney)
}

const paintMoney = (money) => {
  if (money.value == 50000) {
    for (let i = 0; i < money.number; i++) makeMoney50()
  } else if (money.value == 10000) {
    for (let i = 0; i < money.number; i++) makeMoney10()
  } else if (money.value == 5000) {
    for (let i = 0; i < money.number; i++) makeMoney5()
  } else if (money.value == 1000) {
    for (let i = 0; i < money.number; i++) makeMoney1()
  } else if (money.value == 500) {
    for (let i = 0; i < money.number; i++) makeCoin5()
  } else {
    for (let i = 0; i < money.number; i++) makeCoin1()
  }
}

//돈 꺼내기
const pullMoney = () => {
  moneyDetail.forEach((money) => {
    paintMoney(money)
  })
}


//선택한 화폐 제거
const deleteMoney = (e) => {
  e.target.remove()
  const selectedValue = e.target.attributes[1].value;
  if (selectedValue == 50000) {
    moneyDetail[0].number = moneyDetail[0].number - 1
  } else if (selectedValue == 10000) {
    moneyDetail[1].number = moneyDetail[1].number - 1
  }
  if (selectedValue == 5000) {
    moneyDetail[2].number = moneyDetail[2].number - 1
  }
  if (selectedValue == 1000) {
    moneyDetail[3].number = moneyDetail[3].number - 1
  }
  if (selectedValue == 500) {
    moneyDetail[4].number = moneyDetail[4].number - 1
  }
  if (selectedValue == 100) {
    moneyDetail[5].number = moneyDetail[5].number - 1
  }
}


//선택한 금액 계산
const counter = async(e) => {
  const moneyValue = Number(e.target.getAttribute("value"));
  selectedMoney = selectedMoney + moneyValue;
  totalMoney = totalMoney - moneyValue;
  console.log(totalMoney, selectedMoney);
  await deleteMoney(e);
  await show();
}

//돈에 이벤트 넣기
const setEvent = () => {
  for (i = 0; i < paperMoney.length; i++) {
    paperMoney[i].addEventListener("click", counter)
  }
  for (i = 0; i < coinMoney.length; i++) {
    coinMoney[i].addEventListener("click", counter)
  }
}

//지갑열기
const flip = async(e) => {
  e.target.classList.add("wallet-back-flip");
  e.target.parentNode.childNodes[1].classList.add("wallet-back-flip");
  await delay(0);
  await pullMoney();
  await setEvent();
};
walletBack[2].addEventListener("click", flip)