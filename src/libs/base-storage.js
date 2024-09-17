class BaseStorage {
  storage = null
  setData(key, data) {
    const storagedData = JSON.stringify(data)
    this.storage.setItem(key, storagedData)
  }

  getData(key) {
    const storagedInfo = JSON.parse(this.storage.getItem(key))
    return storagedInfo
  }

  removeData(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

export class localStorage extends BaseStorage {
  storage = window.localStorage
}
export class sessionStorage extends BaseStorage {
  storage = window.sessionStorage
}
// export class cookieStorage extends BaseStorage {
//   storage = document.cookie
//   getData() {}
//   setData() {}
// }

// export class indexDB extends BaseStorage {
//   storage = window.indexedDB
//   getData() {}
//   setData() {}
// }

export class encryptedLocal extends BaseStorage {
  // encrypt password algorithm
  encrypt(password) {
    const encryptedPassword = password
      .split('')
      .reverse()
      .map((passChar) => {
        switch (passChar) {
          case '1':
            return 'U'
          case '2':
            return '$'
          case '3':
            return 'L'
          case '4':
            return '&'
          case '5':
            return 'y'
          case '6':
            return 'q'
          case '7':
            return 'N'
          case '8':
            return 's'
          case '9':
            return 't'
          default:
            return passChar
        }
      })
    return encryptedPassword.join('')
  }
  // decrypt password algorithm
  decrypt(password) {
    const decryptedPassword = password.split('').map((passChar) => {
      switch (passChar) {
        case 'U':
          return '1'
        case '$':
          return '2'
        case 'L':
          return '3'
        case '&':
          return '4'
        case 'y':
          return '5'
        case 'q':
          return '6'
        case 'N':
          return '7'
        case 's':
          return '8'
        case 't':
          return '9'
        default:
          return passChar
      }
    })
    return decryptedPassword.reverse().join('')
  }
}
