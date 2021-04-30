import AsyncStorage from "@react-native-async-storage/async-storage"

var item
fn("CartItem")

const fn = (key) => {
    AsyncStorage.getItem(key).then(val => {
      if(val !== null){
        item =  val
      }else{
        item = []
      }
    })
    return item
}

export default item
