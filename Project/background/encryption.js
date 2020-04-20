export class RC4{

   // RC4 symmetric key/stream based encryption
   static crypt(obj, key, eod){
      /*
       * @param: obj -- will hold either a json object
       * to be stringed or a garbled string to be 
       * decrypted
       *
       * @param: key -- the hashed master key and url 
       * used to help build the data to crypt the data
       *
       * @param: eod -- endcrypt or decrypy is needed 
       * to insure the algs work properly
       *
       * @return: string -- crytped version of the data 
       * passed in
       *
       */

      // data to be crypted
      var objStr = (eod ? JSON.stringify(obj) : obj);
      // arrays to decrypt everything
      var s_arr = new Uint8Array(256);
      var t_arr = new Uint8Array(256);
      var j = 0, k = 0;
      var temp = 0;

      // init s and t
      for(let i = 0; i < 256; i++){
         s_arr[i] = i;
         // use the key for more random
         t_arr[i] = (key * i) % 256;
      }

      // permutate s and t
      for(let i = 0; i < 256; i++){
         j = (j + s_arr[i] + t_arr[i]) % 256;
         temp = s_arr[i];
         s_arr[i] = s_arr[j];
         s_arr[j] = temp;

      }

      j = 0; // s
      k = 0; // t
      var rv = "" // return string
      for(let i = 0; i < objStr.length; i++){

         // get the new indexws
         j = (j + 1) % 256;
         k = (k + s_arr[j]) % 256;

         // swap things around to further permutate
         temp = s_arr[k];
         s_arr[k] = s_arr[j];
         s_arr[j] = temp;

         // xor the char with the key char generated
         rv += String.fromCharCode((objStr.charCodeAt(i) ^ (s_arr[s_arr[k] + s_arr[j]] % 256)) % 256);
      }

      return rv; // fin
   }


   // djb hash created by Daniel J. Bernstein
   static randomHashNotRC4(obj){
      /*
       * @param: obj -- holds an object to hashed
       *
       * @return: double-- the hashed sum of data
       */
      var objStr = JSON.stringify(obj);
      var hash = 5384; // magic
      var c = 0;

      // iter and compound the controlled random
      for(var i = 0; i < objStr.length; i++){
         c = objStr.charCodeAt(i);
         hash = ((hash << 5) + hash) + c;
      }
      return hash; // fin
   }
}
