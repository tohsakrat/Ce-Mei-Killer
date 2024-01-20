

## 微博“厕所用户”一键拉黑工具

### 概述
在微博的浩瀚宇宙中，存在着一类被称为“厕所账号”的阴影，它们以匿名投稿的方式肆意扩散负能量，从隔空喊话到挑起争端，乃至煽动网络暴力💢 这些厕所账号无所不用其极，破坏着社区的和谐与信任，使得整个平台的氛围如同黑暗森林一般充满了猜忌和阴霾。

众多微博用户深受其害，却往往感到无力回击😓。这些厕所账号的追随者，无一例外，都沉迷于匿名区的潮湿与阴暗，为负能量的传播助力加油。为了净化你的微博环境，我们开发了这款一键拉黑工具，旨在帮助你脱离这些账号的负面影响，重塑一个清新的微博空间。有了这款一键拉黑工具，清理这些网络垃圾变得触手可及🧹。

### 项目背景
**微博“厕所账号”一键拉黑工具** 是由一位饱受“厕所账号”困扰的微博用户发起的项目🏄‍♂️。此工具集成了**Dogs Killer**项目中的批量拉黑功能，并对获取厕所账号粉丝名单的策略进行了重新编写，以确保时序和逻辑的准确性。经过多轮测试，此工具已被证实为有效且可靠。

### 功能说明
- **全自动拉黑**: 自动识别并拉黑厕所账号的所有粉丝，无需手动逐一操作。
- **零误伤机制**: 精准识别，确保不会牵连到无辜的普通用户。
- **简单易用**: 仅需简单设置，即可快速清理你的微博环境。
  
### 环境准备
- 一台装有任何chrome内核浏览器的电脑

### 使用方法
1. 登录PC版微博。如果已经和厕所双拉黑，可能获取不到粉丝列表，这时候需要采用小号获取uid列表，再由大号进行批量拉黑。会代码这很简单，不会也没关系，你奶奶都能看懂的拉黑教程会在稍后推出。
   
![image](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/d3ed3196-8be4-4694-80f1-418139485bdd)

4. 右上角账号设置 - 屏蔽设置
   
![image](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/10cb913f-24f8-419b-ac95-258838417408)

6. 点击键盘上的f12，调出开发者工具，右上角“网络”选项卡

![image](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/faadea4f-d5ff-4cc9-885e-aa8b17fe887e)

7. 点击“解除屏蔽”先放厕所出来透透气。别担心，待会关回去。解除屏蔽同时观察右侧网络面板。

![image](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/3c927728-74f8-4bad-b1c1-d4de20108609)

在你鼠标按下的同时，右边会多出来几行
![image](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/1ce5a714-88c3-4b13-bc89-b0aa11c576d4)


8. 在上一步网络面板增加的请求中，找到deleteFilteredUser这个请求，鼠标点击，找到“响应”选项卡，寻找其中uid=xxx的字样，把uid=xxx后面那串数字复制下来

![image](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/ec1803fe-a998-4e32-892b-c097e12e9521)

9. 从“网络”选项卡切换到“控制台”选项卡

![image](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/76a32326-ab36-43b4-b4bb-794925350cfb)

10. 进入项目文件[Ce-Mei-Killer.js](https://github.com/tohsakrat/Ce-Mei-Killer/blob/main/Ce-Mei-Killer.js)，复制全部代码，粘贴到控制台中，回车。
   单独输入这段，并且把目标uid替换成你要拉黑的厕所的uid。
    ```javascript
    mainBlockAll(2303645815)// 替换为目标用户ID，一键拉黑
    ```
   回车。
   
>  tips
>  遇到了奇奇怪怪的问题，有用户表示找不到光标没法粘贴，注意看光标在">"符号右边那条狭窄细长的区域，用鼠标多点几下，没有光标出来就是没点对地方
>  ![image](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/856e58ce-8500-4429-8d0f-ed0fdae44ea4)
>  有用户遇到了不能粘贴
> ![35@2UN~KJR%@1 ZF@GF(Y6X](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/3cfe4e2a-d5ee-4ae7-8fe6-ed71d1e19948)
> 参考[这篇文章](https://blog.csdn.net/KimBing/article/details/134938756)，在输入框手打allow pasting，然后回车，接下来就可以粘贴了
> 



![image](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/530539e5-4a29-4372-8538-10ac39b4ff0d)

这时候代码就开始跑起来了，效果如下：
这是在获取粉丝列表

![image](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/5c99122b-c321-4998-98f8-c60d4ee2823d)

获取完成后，会把粉丝列表打印在控制台中。以防万一，可以右键保存，粘贴在本地记事本中。这样下次进入页面就不用重新获取了。

![image](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/f3f78519-fdb9-4ca2-b7dd-e8b0fe7a561d)

![image](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/81a6eeb2-2437-4841-8ab5-07fb9e2ae6e4)

这是开始拉黑了

![image](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/a070060c-2958-4fef-b1dd-c35ec2716b5f)

11. 喝杯茶，静待拉黑完成，如果遇到请求太频繁被大眼制裁（下图）不要慌张

 ![image](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/74b2af1f-fd25-4814-a330-a9a980832d7b)

12. 滚动控制台，回到一开始的提示，复制完整的dogs数组，粘贴到本地的记事本

![image](https://github.com/tohsakrat/Ce-Mei-Killer/assets/45536831/81a6eeb2-2437-4841-8ab5-07fb9e2ae6e4)

13. 刷新页面后，在控制台输入
```javascript
window.allDogs=[...]
//[...]为你刚刚复制的数组
```

再次在[Ce-Mei-Killer.js](https://github.com/tohsakrat/Ce-Mei-Killer/blob/main/Ce-Mei-Killer.js)，复制全部代码，粘贴到控制台中回车

然后单独输入下面这段，把12345换成刚刚最后一次报错前正在处理的uid。
```javascript
 //mainResume(12345)//从上一次失败处开始拉黑，用于请求太频繁被大眼制裁的情况 
```

### 贡献和支持
如果这个工具帮你扫除了网络环境中的负能量，像一股清流🌊🌊🌊不妨给我们一个星标（Star✨），你的支持是我们最大的动力。同时，如果在使用过程中遭遇任何问题，欢迎提交问题（Issue🤔），我们会积极响应并完善工具。

---

Gegerated by GPT4-Turbo
