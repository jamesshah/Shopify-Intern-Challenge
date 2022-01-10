console.log("hi");

const viewAllItems = async () => {
  const list = document.getElementById("itemsList");
  const items = await (await fetch("/api/items")).json();
  //   console.log(items);
  if (list.children.length === 0) {
    items.forEach((item) => {
      console.log(item);
      let elem = document.createElement("li");
      elem.appendChild(document.createTextNode(item.name));
      list.appendChild(elem);
    });
  }
};
