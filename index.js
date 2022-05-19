window.onload = function () {
  let selected = document.getElementById("selected");
  let main = document.getElementById("main");
  let checkbox = main.getElementsByTagName("input");
  let flag = false;
  let oldleft = 0;
  let oldtop = 0;
  main.onmousedown = function (e) {
    flag = true;
    selected.style.left = e.pageX + "px";
    selected.style.top = e.pageY + "px";
    oldleft = e.pageX;
    oldtop = e.pageY;
  };
  main.onmousemove = function (e) {
    if (!flag) return;
    if (e.pageY < oldtop) {
      selected.style.top = e.pageY + "px";
      selected.style.height = oldtop - e.pageY + "px";
    } else {
      selected.style.height = e.pageY - oldtop + "px";
    }
    if (e.pageX < oldleft) {
      selected.style.left = e.pageX + "px";
      selected.style.width = oldleft - e.pageX + "px";
    } else {
      selected.style.width = e.pageX - oldleft + "px";
    }
    //在有了X和Y坐标后通过加上自身长度算出bottom和right
    selected.style.bottom =
      Number(selected.style.top.split("px")[0]) +
      Number(selected.style.height.split("px")[0]) +
      "px";
    selected.style.right =
      Number(selected.style.left.split("px")[0]) +
      Number(selected.style.width.split("px")[0]) +
      "px";
    for (let i = 0; i < checkbox.length; i++) {
      let left = checkbox[i].offsetLeft + main.offsetLeft;
      let right = checkbox[i].offsetWidth + left;
      let top = checkbox[i].offsetTop + main.offsetTop;
      let bottom = checkbox[i].offsetHeight + top;

      let isleft =
        selected.style.left.split("px")[0] <= left &&
        left <= selected.style.right.split("px")[0];
      let isright =
        selected.style.left.split("px")[0] <= right &&
        right >= selected.style.left.split("px")[0];
      let istop =
        selected.style.top.split("px")[0] <= top &&
        top <= selected.style.bottom.split("px")[0];
      let isbottom =
        selected.style.bottom.split("px")[0] >= bottom &&
        bottom >= selected.style.top.split("px")[0];
      if ((isleft || isright) && (istop || isbottom))
        checkbox[i].checked = true;
    }
  };
  main.onmouseup = function (e) {
    if (!flag) return;
    flag = false;
    selected.style.width = 0;
    selected.style.height = 0;
    selected.style.top = 0;
    selected.style.left = 0;
    selected.style.bottom = 0;
    selected.style.right = 0;
  };
};
