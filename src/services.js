
import axios from "./axios-orders";
export const getLocalization = ()=>
{
        if (!navigator.geolocation){
            return;
        }
        function success(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            reverseGeocodingWithGoogle(longitude, latitude)
        }
        function error() {
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
        .then(response => {
        })
        .catch(status => {
        })
}