# ěěí¨ěě redux

---

> ěěíę¸°ě  ę¸°ë° ë¤ě§ę¸°

# í¨ě

---

## đ¤ í¨ěë ëŹ´ěě¸ę°?

---

### A. í¨ěë...
- ěë Ľ => (do something)  => ěśë Ľ
- ěë Ľě ě¸ě, ěśë Ľě ëŚŹí´ ę°

  ```javascript
  function add(a, b){
    return a+b;
  }
  ```

------

## đ¤ Pure Functioně´ë?

---

### A. Pure Functioně...
- đ§ ěě í¨ě? ë­ę° ěěíë¤ë ęą¸ęš?
  - ěí í¨ě f(x) = x * 2
  - ëłëě´ ěë¤. íę˛° ę°ë¤.
  - ěë Ľě´ ę°ěźëŠ´ ę˛°ęłźę° ę°ë¤.
  - ě¸ëśě ëŹ´ě¸ę°ëĽź ëłę˛˝í´ě  ěëë¤.

---

### ě´ëťę˛ ěěí  ě ěë?
<center>

![](https://ws3.sinaimg.cn/large/006tNbRwgy1fwdo7xoutsj307v0esq5q.jpg)

</center>

---

### ěěíě§ ëŞťí ę˛˝ě°ëĽź ëł´ě 1/3
> í¸ěśí  ëë§ë¤ ëŹëźě§ë ę°

```javascript
  function notPure(a, b){
    return a+b+Math.random();
  }
  notPure(1,2);
  notPure(1,2);
```
---

### ěěíě§ ëŞťí ę˛˝ě°ëĽź ëł´ě 2/3
> ěŁźëłě ë°ëź ę°ě´ ëŹëźě§ ě ěë í¨ě

  ```javascript
  var x = 3;
  function dirty(a, b){
    return a+b+x;
  }
  dirty(1,2);
  x= 4;
  dirty(1,2);
  ```
---

### ěěíě§ ëŞťí ę˛˝ě°ëĽź ëł´ě 3/3
> ěśë Ľę°ě ę°ěźë ě¸ëśëĽź ëłę˛˝íë í¨ě

  ```javascript
  var count = 0;
  function messUp(a, b){
    count++;
    return a+b;
  }
  ```

---

### ě´ëťę˛ ěěí  ě ěë?
- ěěš 1
  - ěśë Ľę°ě ěíĽě ěŁźë ëŞ¨ë  ę˛ëĽź ěë ĽěźëĄ ë°ëë¤.
- ěěš 2
  - í¨ě ë´ëśě ě˝ëěě í¨ě ě¸ëśě ëłěëĽź ě ęˇźíě§ ěëë¤.
- ěěš 3
  - ě¸ëśě ëłíë ě¸ëśěě ěěě ě í´ě í  ě ěëëĄ ę¸¸ě ě´ě´ ë  (ě. callback)

------


### ěěíę˛ ë°ężëł´ě 1/4

- ë´ëśěě random ě˛ëź ę°ëłě ě¸ ë´ěŠě ě ęą°íë¤.
- íěíë¤ëŠ´ ę°ëłě ě¸ ëśëśě ë°ěźëĄ ëśëŚŹíë¤.

  ```javascript
  function notPure(a, b){
   	 return a+b+Math.random();
  }
  
  function nowPure(a, b, extra){
   	 return a+b+extra;
  }
  
  nowPure(a, b, Math.random());
  nowPure(a, b, Math.random());
  // ěë ľě´ ëŹëźě§ ę˛, ěë Ľě´ ę°ě ëë ěśë Ľě´ í­ě ę°ě
  ```

------

### ěěíę˛ ë°ężëł´ě 2/4

- ë´ę° íë ěźě ëŞ¨ë ë´ ěěě!
- ë´ëśěě ě¸ëś(ě. global)ě ę°ě ě°¸ěĄ°íě§ ěëë¤.

  ```
  // ě 2
  var x = 3;
  function dirty(a, b){
    return a+b+x;
  }
  
  function notDirty(a, b, extra){
    return a+b+extra;
  }
  
  notDirty(1, 2, x);
  x = 4;
  notDirty(1, 2, x);
  // ěë ľě´ ëŹëźě§ ę˛, ěë Ľě´ ę°ě ëë ěśë Ľě´ í­ě ę°ě
  ```



------

### ěěíę˛ ë°ężëł´ě 3/4

- ě¸ëśě ë´ěŠě ë°ęž¸ě§ ěěěźíëŠ° ę˛°ęłźëĽź ë°ěě ë°ěě ě˛ëŚŹíëëĄ

  ```javascript
  var count = 0;
  function messUp(a, b){
    count++;
    return a+b;
  }
  
  function notMessUp(a, b, count){
    return {
      value: a+b,
      count: count++
    };
  }
  
  const result = notMessUp(1, 2, count);
  count = result.count;

  ```
  
---

### ěěíę˛ ë°ężëł´ě 4/4
- ě¸ëśě ëłíě´ë ě¸ëśę° ěěě íëëĄ callbackě ě§ě íëëĄ í´ě¤ë¤.
  
  ```javascript
  function notMessUp2(a, b, callback){
    callback();
    return a+b;
  }
  
  var count = 0;
  
  notMessUp2(1, 2, ()=>{
    count++
  });
  ```

------

### ě´ëě ë§ě´ ëł´ë ëŞ¨ěľ?

```javascript
class CountButton extend Component {
  count = 0
  onPress(){
    alert(`${++this.count}ë˛ ëë ě´!`);
  }
  render() {
    return <Button
      onPress={this.onPress}
      title="Learn More"
      color="#841584"
    />;
  };
}
```

---

### đ§ ěěíëŠ´ ë­ę° ě˘ěę°?

- ěë Ľě´ ěě ë ę˛°ęłźëĽź ěě¸Ąí  ě ěë¤.
- ěě¸ĄíëŠ´ ěśę°ě ěźëĄ íě¤í¸ëĽź ě˝ę˛ í  ě ěë¤.
  - ěě¸Ąě´ ěśŠëśí ëę¸°ě ěě¸Ąęłź ë¤ëĽ¸ě§ëĽź ëšęľíëëĄ íě¤í¸ ě˝ë ěěą

---

## đ¤ ëŚŹěĄí¸ ěť´íŹëí¸ === í¨ě?

---

### A. YES! ëŚŹěĄí¸ ěť´íŹëí¸ë í¨ěě´ë¤.

- ==ěë Ľ== : `props`
- ==ěśë Ľ==
  - ěëŻ¸ě  ěśë Ľ : `render`ě return ę°(View)
  - ě¤ě  ěśë Ľ : í¨ěě return ę°
    - Stateless Componentě ę˛˝ě° : return ę°(View)
    - ěźë° Componentě ę˛˝ě° : ę°ě˛´
      - ëźě´í ěŹě´í´
      - render í¨ě

---

### ěŹ ëźě´í ěŹě´í´ě¸ę°?
- ë´ëśě `state`ę° ěë¤ë ę˛ě **ëě , ě´ěěë¤**ë ěëŻ¸. ě¸ëś ěęˇšě´ ěě´ë ě¤ě¤ëĄ ëłí  ě ěë ę°ě˛´
- props(ěë Ľ)ě´ ë°ë ëë§ ę˛°ęłź(View)ę° ëŹëźě§ë ę˛ě´ ěëëź 
ë´ëśě ěźëĄë ëŹ´ě¸ę°(state) ëłíëŠ´ ę˛°ęłź(View)ę° ëłíë¤.

---

## đ¤ ěť´íŹëí¸ě `props`ě `state`ë ëŹ´ěě¸ę°?

---

### A. `props`ě `state`ë...

- ==**props**== : View ęłě¸ľęľŹěĄ°ěě ëśëŞ¨ę° ëěę˛ ëę˛¨ěŁźë ę˛
  - ě¸ëśěě ěť´íŹëí¸ ë´ëśëĄ ëŹ´ě¸ę°ëĽź ě ëŹíë ě ěźí ę¸¸
  - ë°ěě ëę˛¨ě¤ ę˛ě ë°ęž¸ě§ ěëë¤. ěŹěŠí  ëż!

- ==**state**== : í´ëš ěť´íŹëí¸ę° ěěě ę´ëŚŹí´ěźíë ë°ě´í°
  - ě¸ëśěě ě§ě  ëłę˛˝ ëŞťíë ë´ëśěě ěŹěŠíëë° ë°ě´í°: stateę° ëłíëŠ´ ě´ěë°ëź renderíë View(ę˛°ęłźę°)ę° ëŹëźě ¸ěźíë ë°ě´í°

---

### ěť´íŹëí¸ ę°ě ë°ě´í° ě ëŹě ë¨ë°ŠíĽ
- propě ě´ěŠíěŹ ëśëŞ¨ěě ěěěźëĄ~

---

### ěą ě ě˛´ěě ěŹěŠëë ęłľíľ state
- ëĄęˇ¸ě¸ ě ëł´
- íę˛˝ ě¤ě  ě ëł´
  - ě¸ě´ ě¤ě 
- ...

---

### ě´ë´ ë ě´ë¤ ëśí¸í¨ě´ ěę¸°ë?
- stateě ě ëŹ
- stateě ëłę˛˝

---

### ě´ë ¤ě ěě : stateě ě ëŹ

- [ěí íëŠ´](https://cdn.pttrns.com/634/7943_f.jpg)

```javascript
function Header(props){
  return (
    <View>
      <SearchView/>
      <RightProfileView/>
    </View>
  );
}

function RightProfileView(props){
  return (
    <View>
      <Image source={{uri: props.loginUserProfile}}/>
    </View>
  );
}
```

---

```javascript
Class AppView extends Component{
  constructor(props){
    super(props);
    this.state = {
      loginUserName,
      loginUserProfile
    }
  }
  async login(){
    // ... 
    // ëĄęˇ¸ě¸ í ě ëł´ëĽź stateěě ę´ëŚŹ
    const user = await API.login('myId','myPassword');
    this.setState({
      loginUserName: user.name
      loginUserProfile: user.profile
    });
  }
  render() {
    return (
      <View>
        <Header />
        <MainView />
      </View>
    );    
  }
}
```

---

### ě´ë ¤ě ěě : stateě ëłę˛˝

---

### đ§ ěíę´ëŚŹëęľŹë ě´ëŹí ëŹ¸ě ëĽź í´ę˛°íę¸° ěí ëęľŹ

---

# 11ěĽ **ëęˇëŞ¨ ě íëŚŹěźě´ěěěě State ę´ëŚŹ**

---

## `redux`ě 3ë ę°ë
- store
- action
- reducer

---
### `store`
- ë¨ěź ę°ě˛´
- ěť´íŹëí¸ě `props`ëĄ ë´ěŠě ě ëŹ
- `store`ě ě´ęšę°ě reducerěě ę˛°ě  ë¨

---
### `action`
- `store`ě ëłíëĽź ě´ëě´ ë´ë ě­í 
- ěąěě ěźě´ëë ěźě í´ëš
```javascript
export const stopReview = () => {
  return { type: STOP_REVIEW, data: {} };
};
```
---


### reducer
- ěĄěě ë°ëĽ¸ stateëĽź ě´ëťę˛ ë°ężěź í ě§ ëíë¸ ę˛
- input ë°ě ę¸°ěĄ´ stateě action
- output ěëĄě´ state
- đ§ ěě í¨ě
- store ě´ę¸°ę° ę˛°ě 
- ěŹëŹ reducerëĽź combineíěŹ íëě storeëĽź ěŹëŹę°ě¸ ëŻ

```javascript
const reducer = (state = [], action) => {
  console.warn("Changes are not persisted to disk");
  switch (action.type) { 
    case ADD_DECK:
      return state.concat(action.data);   
    }
  return state; 
};
```
---

### đ§ 3ëë ę°ëě ěëě§ë§...
- `dispatch()` í¨ě : `action`ě `reducer`ěę˛ ě ëŹíěŹ `reducer`ę° ě¤íëëëĄ íë í¨ě
  - `store` ëłíëĽź ěźěźí¤ë ěě ě 

---

### ě¤ě  1ë¨ęł : `createStore`
- createStoreëĄ ě¤í ě´ ěěą
  - storeë recuerę° ę˛°ě 
  ```
  import { createStore } from "redux";
  import { reducer } from "../reducers/index";
  
  let store = createStore(reducer);
  ```
- ěźë°ě ěźëĄ ěą ęľŹëě˝ëěě ě¤í

---

### ě¤ě  2ë¨ęł : `<Provider>`
- `<Provider>`ëĄ `<App/>`ěľěě ěť´íŹëí¸ëĽź ę°ě¸ę¸°
- ě´ë íě ëŞ¨ë  ěť´íŹëí¸ě ěëěźëĄ store(ëŚŹëě¤ě state)ę° ě ëŹ ëëëĄ í¨

---

### ě¤ě  3ë¨ęł : `connect()`
- `Provider`ëĄ ëśí° ě ëŹëë `store`ëĄ ëśí° íěí ěŹí­ě ě°ę˛°í´ěŁźë ěëĄě´ ěť´íŹëí¸ ěěą (HOC)
```
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecksScreen);
```
  - `mapStateToProps` : storeě ě´ë¤ stateëĽź propsěźëĄ ě ëŹí ě§ ę˛°ě 
  - `mapDispatchToProps` : dispatchëĽź ě¤ííë í¨ěëĽź propsëĄ ě ëŹ
	- ě´ëĽź ě§ě íě§ ěěźëŠ´ `this.props.dispatch`ëĄ ě ęˇźíěŹ dispatchí¨ěëĽź ě§ě  ěŹěŠ ę°ëĽ

---

### ěě í ëśëŚŹ
> ë´ę° í ěźě ë´ę°, ëę° í ěźě ëę° ěěě

- ě°ëŚŹę° ë§ëë Componentë ë¨ě í´ě§
  1. ě´ë¤ propsě ë°ëź ëł´ěŹěŁźë ëŞ¨ěľ ëŹëźě§ę˛
  2.  ë´ëśěě ě´ë¤ěźě´ ěźě´ëëŠ´ propsě íšě  í¨ěę° ě¤íëëëĄ

- reduxę° í´ěŁźë ěź
  - storeě íšě  ę°ě i) ë¨ęłě propsěźëĄ ě ęłľ
  - Componentě ë´ëśěě ě´ë¤ěźě´ ěźě´ë  ë íšě  actioně´ dispatchëëëĄ 

---

> reduxëĽź ěí ë¤ěí ëęľŹ 1
## [`redux-persist`](https://github.com/rt2zz/redux-persist)
Reduxě ě¤í ě´ëĽź AsyncStorageě ëł´ę´
- ě¤ěš : `npm install redux-persist --save`

---

## `redux-persist` ěŹěŠë˛ 1/2
- persistedReducerëĽź ěěą
```
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer)
let persistor = persistStore(store)
```

---

## `redux-persist` ěŹěŠë˛ 2/2
```
import { PersistGate } from 'redux-persist/integration/react'

// ... normal setup, create store and persistor, import components etc.

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootComponent />
      </PersistGate>
    </Provider>
  );
};
```

---

> reduxëĽź ěí ë¤ěí ëęľŹ 2
## [`redux-logger`](https://www.npmjs.com/package/redux-logger)
Reduxě ě¤í ě´ëĽź AsyncStorageě ëł´ę´
- ě¤ěš : `npm i --save redux-logger`

```
import { applyMiddleware, createStore } from 'redux';
 
// Logger with default options
import logger from 'redux-logger'
const store = createStore(
  reducer,
  applyMiddleware(logger)
)
```
---
