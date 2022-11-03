
import { ref, set } from "firebase/database";
import { realtime_database, db } from '../firebase';
import { onValue} from "firebase/database";
import { collection, getDocs } from "firebase/firestore";


async function writeUserLocationToDb(userId, long, lat) {
  set(ref(realtime_database, 'users/' + userId), {
    longitude: long,
    latitude: lat
  });
}

export async function updateUserLocation(longitude, latitude, userUid){
                console.log("updateUserLocation called")

                if(userUid){
                   writeUserLocationToDb(userUid, longitude, latitude)
                }
                else {
                console.warn("UserUid undefined.")
                }
}


export async function getNearUsersFromDb(userId) {
    console.log("GetNearUsersFromDb called")
    const max_distance = 3; //kilometer
    nearUserList = getNearUserIdsFromDb(max_distance, userId)
    //console.log("Near Users: "+ nearUserList)
    userProfiles = await getProfileData(nearUserList)
    //console.log ("Profiel data" + userProfiles[0].name)
    return userProfiles

    //            const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
    //
    //            const response = await fetch(weatherUrl)
    //
    //            const result = await response.json()



    //            if (response.ok) {
    //                setNearUserList(result)
    //            } else {
    //                setErrorMessage(result.message)
    //            }
}

function getNearUserIdsFromDb(max_distance, userId){
     var nearUsers = [];


    const userIdsRef = ref(realtime_database);
    onValue(userIdsRef, (snapshot) => {
//      const data = snapshot.val();
//        console.log("Data: "+ len(data))
       snapshot.forEach(function(childSnapshot) {
            json= JSON.stringify(childSnapshot.val());
            json= JSON.parse(json)
            for (var key in json) {
                if (json.hasOwnProperty(key)) {
                    distance= getDistanceFromLatLonInKm(json[key].latitude, json[key].longitude, json[userId].latitude, json[userId].longitude )
                    if(distance<=max_distance && key!=userId){
                             tmp = {};
                             tmp.uid = key;
                             tmp.distance=Math.round(distance*1000);
                        nearUsers.push(tmp)
                    }
                }
            }
          });
    });
    return nearUsers;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

async function getProfileData(nearUserList){

    const querySnapshot = await getDocs(collection(db, "users"));
    tmp=[]
    querySnapshot.forEach((doc) => {

      // doc.data() is never undefined for query doc snapshots
      tmp.push(doc.data())
      //console.log("doc data"+ doc.data().uid)
    });

    //console.log("tmo: " + tmp[0].uid)

    userProfileList = []
    for (const userObject of nearUserList){
        for (const userEntry of tmp) {
            //console.log("userEntry.uid "+ userEntry.uid +  " userObject.uid" + userObject.uid)

            if(userEntry.uid==userObject.uid){
                userObject.name= userEntry.displayName
                userObject.profiletext = userEntry.profileText
                userObject.image = userEntry.photoUrl
                userProfileList.push(userObject)
            }
        };
    }

    //console.log("UserProfileLIst[0]" + userProfileList[0].displayName)
    return userProfileList
}