async function getTotalPages(uid, pageSize) {
  const url = `https://weibo.com/ajax/user/popcard/get?id=${uid}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    const followersCount = parseInt(data.data.followers_count_str, 10);
    return Math.ceil(followersCount / pageSize); // 返回需要请求的总页数
  } catch (error) {
    console.error('Error fetching followers count:', error);
    return 0; // 发生错误时返回0temp1.data.followers_count_str
  }
}

async function fetchPage(uid, page) {
  const url = `https://weibo.com/ajax/friendships/friends?relate=fans&page=${page}&uid=${uid}&type=fans&newFollowerCount=0`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.users && data.users.length > 0) {
      console.log(`Fetched page ${page}.`);
      return data.users;
    } else {
      console.log(`Page ${page} is empty, possibly blocked dogs.`);
      return [];
    }
  } catch (error) {
    console.error('Fetch error on page ' + page + ':', error);
    return [];
  }
}

async function fetchAllDogs(uid) {
  const pageSize = 20; // 每页20个用户
 window.allDogs = []; // 用于保存所有恶意用户信息

  // 首先获取总页数
  const totalPages = await getTotalPages(uid, pageSize);

console.log('------- kill '+ totalPages+' pages of dogs -------')
  if (totalPages === 0) {
    console.log('No pages to fetch or error occurred.');
    return;
  }

  // 创建一个promise数组来存储所有的fetch请求
  const fetchPromises = [];

  for (let page = 1; page <= totalPages; page++) {
    fetchPromises.push(new Promise(resolve => {
      setTimeout(async () => {
        const dogs = await fetchPage(uid, page);
        resolve(dogs);
      }, (page - 1) * 1000); // 每2秒发起一个新的请求
    }));
  }

  // 使用Promise.all来等待所有的请求完成
  const dogsPages = await Promise.all(fetchPromises);
  window.allDogs= dogsPages.flat(); // 将所有页的dogs合并到一个数组中

  console.log('All dogs fetched. Total dogs:', allDogs.length);
  console.log(allDogs);
}

fetchAllDogs(2303645815);



function blockDogs(dogs) {
  var http = new XMLHttpRequest();
  var i = 0;
  var timer = setInterval(function kill() {
    if (i >= dogs.length) {
      return clearInterval(timer);
    }
    var dogId = dogs[i];
    var url = 'https://weibo.com/aj/filter/block?ajwvr=6';
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.send('uid='+dogId+'&filter_type=1&status=1&interact=1&follow=1');
    http.onreadystatechange = function() {
      if (http.readyState != 4 || http.status != 200) {
        return;
      }
      var data = {
        msg: '解析失败'
      };
      try {
        data = JSON.parse(http.responseText);
      } catch (err) {}
      if (data.code == 100000) {
        console.log(i + '[' + dogId + '] => 成功:' + data.msg + ' - ' + http.status + ' - ' + http.responseText);
      } else {
        console.error(i + '[' + dogId + '] => 失败:' + data.msg + ' - ' + http.status + ' - ' + http.responseText);
      }
    };
    i++;
  }, 1000);
}

// 主函数来获取所有恶意用户并拉黑
async function main(uid) {
  try {
    await fetchAllDogs(uid).then((dogs) => {
      // 确保所有恶意用户都被获取后再调用blockDogs
      blockDogs(window.allDogs.map(e=>e.id)); // 开始拉黑操作
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// 使用此函数开始整个流程，替换下面的UID为目标用户ID
main(2303645815);
