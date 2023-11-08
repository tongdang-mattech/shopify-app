export function convertCoordinates  ([longitude, latitude])  {
    const roundedLatitude = latitude.toFixed(4);
    const roundedLongitude = Math.abs(longitude).toFixed(4);
    
    const latitudeDirection = latitude >= 0 ? 'N' : 'S';
    const longitudeDirection = longitude >= 0 ? 'E' : 'W';
    
    return `${roundedLatitude}°${latitudeDirection} / ${roundedLongitude}°${longitudeDirection}`;
  };
