// 表格数据的一些公用方法
export function getMenu(menu:any) {
  var menuData = menu;
  menuData.forEach((ele:any) => {
    let parentId = ele.parentId;
    if (parentId === 0) {
      //是根元素的hua ,不做任何操作,如果是正常的for-i循环,可以直接continue.
    } else {
      //如果ele是子元素的话 ,把ele扔到他的父亲的child数组中.
      menuData.forEach((d:any) => {
        if (d.id === parentId) {
          let childArray = d.children;
          if (!childArray) {
            childArray = []
          }
          childArray.push(ele);
          d.children = childArray;
        }
      })
    }
  });
//去除重复元素
  menuData = menuData.filter((ele:any) => ele.parentId === 0);
  // console.log('最终等到的tree结构数据: ', menuData);
  return menuData
}


export function getMenuTree(menu:any) {
  var menuData = menu;
  menuData.forEach((ele:any) => {
    let pId = ele.pId;
    if (pId === 0) {
      //是根元素的hua ,不做任何操作,如果是正常的for-i循环,可以直接continue.
    } else {
      //如果ele是子元素的话 ,把ele扔到他的父亲的child数组中.
      menuData.forEach((d:any) => {
        if (d.id === pId) {
          let childArray = d.children;
          if (!childArray) {
            childArray = []
          }
          childArray.push(ele);
          d.children = childArray;
        }
      })
    }
  });
//去除重复元素
  menuData = menuData.filter((ele:any) => ele.pId === 0);
  // console.log('最终等到的tree结构数据: ', menuData);
  return menuData
}

//组合选中的权限菜单和id
export function getMenuIds(menu:any) {
  var menuIds = [];
  for (var i = 0; i < menu.length; i++) {
    if(menu[i].checked == true){
      menuIds.push(menu[i].id)
    }
  }
  return menuIds
}

