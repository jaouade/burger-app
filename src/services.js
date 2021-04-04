
import axios from "./axios-orders";
export const getLocalization = ()=>
{
        if (!navigator.geolocation){
            console.log("Geolocation is not supported by your browser");
            return;
        }
        function success(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            reverseGeocodingWithGoogle(longitude, latitude)
        }
        function error() {
            console.log("Unable to retrieve your location");
        }
        navigator.geolocation.getCurrentPosition(success, error);
}

function reverseGeocodingWithGoogle(latitude, longitude) {
    axios.get(
        `https://maps.googleapis.com/maps/api/js?latlng=${latitude},${longitude}&key=AIzaSyCFpK_XwYSY0pfZUBKXSZl-WgTihOAV6Uo`,
        {
            headers :{
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then( res => console.log(res))
        .then(response => {
            console.log("User's Location Info: ", response)
        })
        .catch(status => {
            console.log('Request failed.  Returned status of', status)
        })
}