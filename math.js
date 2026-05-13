function distance(p1, p2)  {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z)
}

function fovToFocalLength(fov, height) {
    const tanHalfFov = Math.tan(degToRad(fov / 2));
    return height / 2 / tanHalfFov;
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
