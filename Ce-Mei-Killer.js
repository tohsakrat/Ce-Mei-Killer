// 通用的网络请求函数
async function makeRequest(url, method = 'GET', body = null, headers = {}) {
  try {
    const response = await fetch(url, {
      method,
      headers,
      body
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Request failed:', error);
  }
}

// 获取总页数
async function getTotalPages(uid, pageSize) {
  const url = `https://weibo.com/ajax/user/popcard/get?id=${uid}`;
  const data = await makeRequest(url);
  if (data) {
    console.log(data);
    const followersCount = parseInt(data.data.followers_count_str, 10);
    return Math.ceil(followersCount / pageSize);
  }
  return 0;
}

// 获取某一页的粉丝
async function fetchPage(uid, page) {
  const url = `https://weibo.com/ajax/friendships/friends?relate=fans&page=${page}&uid=${uid}&type=fans&newFollowerCount=0`;
  const data = await makeRequest(url);
  if (data && data.users && data.users.length > 0) {
    console.log(`Fetched page ${page}.`);
    return data.users;
  } else {
    console.log(`Page ${page} is empty, possibly blocked dogs.`);
    return [];
  }
}

// 获取所有粉丝的封装函数
async function fetchAllFans(uid) {
  const pageSize = 20;
  const totalPages = await getTotalPages(uid, pageSize);
  console.log(`------- Fetching ${totalPages} pages of dogs -------`);
  if (totalPages === 0) {
    console.log('No pages to fetch or error occurred.');
    return [];
  }

  let allFans = [];
  for (let page = 1; page <= totalPages; page++) {
    const fans = await fetchPage(uid, page);
    allFans = allFans.concat(fans);
  }
  allFans = allFans.map(e=>e.id)
  console.log('All fans fetched. Total dogs:', allFans.length);
  console.log(allFans)
  return allFans;
}

// 拉黑某个用户
async function blockDog(userId) {
	
	console.log("开始拉黑")
	console.log(userId)
  var url = 'https://weibo.com/aj/filter/block?ajwvr=6';
  var body = `uid=${userId}&filter_type=1&status=1&interact=1&follow=1`;
  var headers = {
    'Content-type': 'application/x-www-form-urlencoded'
  };
  const data = await makeRequest(url, 'POST', body, headers);
  if (data && data.code == 100000) {
    console.log(`[${userId}] => Block success: ${data.msg}`);
  } else {
    console.error(`[${userId}] => Block failed: ${data.msg}`);
  }
}

// 拉黑所有粉丝
async function blockAllDogs(uid) {
  window.allDogs = await fetchAllFans(uid);
   mainBlockList(window.allDogs); 
}

// 主函数 - 一键拉黑版本
async function mainBlockAll(uid) {
  try {
    await blockAllDogs(uid);
  } catch (error) {
    console.error('An error occurred in mainBlockAll:', error);
  }
}

// 主函数 - 只获取厕所账号粉丝版本
async function mainFetchFans(uid) {
  try {
    await fetchAllFans(uid);
  } catch (error) {
    console.error('An error occurred in mainFetchFans:', error);
  }
}

// 暴力法延迟
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 主函数 - 只拉黑一个uid数组版本
async function mainBlockList(uids) {
  if (typeof window.allDogs == 'undefined') window.allDogs = uids;
  try {
    for (let index = 0; index < uids.length; index++) {
      const userId = uids[index];
      console.log(`Blocking dog ${userId} at index ${index} total ${uids.length}`); // 输出当前userId和下标
      await blockDog(userId); // 执行拉黑操作
      await delay(200); // 等待0.2秒
    }
	
  } catch (error) {
    console.error('An error occurred in mainBlockList:', error);
  }
}

// 主函数 - 从上一次失败处重新kill
async function mainResume(uid) {
  try {
    const dogs = window.allDogs || [];
    const index = dogs.indexOf(uid);
    if (index === -1) {
      console.log('UID not found in allDogs.');
      return;
    }
    const dogsToBlock = dogs.slice(index); // 从指定的UID开始到数组末尾的所有dogs
	console.log("继续拉黑")
	console.log(dogsToBlock)
    mainBlockList(dogsToBlock); // 开始拉黑操作
  } catch (error) {
    console.error('An error occurred:', error);
  }
}



// 根据需要调用不同的主函数
//mainBlockAll(2303645815); // 替换为目标用户ID，一键拉黑
// mainFetchFans(2303645815);//只获取厕所粉丝
// mainFetchFans(2303645815); // 替换为目标用户ID，只获取厕所账号粉丝
// mainBlockList([12345, 67890]); // 替换为需要拉黑的用户ID数组，只拉黑指定用户
 //mainResume(12345)//从上一次失败处开始拉黑，用于请求太频繁被大眼制裁的情况 
