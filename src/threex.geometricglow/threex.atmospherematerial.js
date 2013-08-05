var THREEx = THREEx || {}

/**
 * from http://stemkoski.blogspot.fr/2013/07/shaders-in-threejs-glow-and-halo.html
 * @return {[type]} [description]
 */
THREEx.createAtmosphereMaterial	= function(){
	var vertexShader	= [
		'uniform float	coeficient;',
		'uniform float	power;',

		'varying float	intensity;',

		'void main(){',
		'	// compute intensity',
		'	vec3 vNormal	= normalize(normalMatrix * normal);',

		// '	vec3 camPosition= normalize(normalMatrix * cameraPosition);',
		// '	intensity	= pow( coeficient - dot(vNormal, camPosition), power );',

		'	intensity	= pow( coeficient - dot(vNormal, vec3(0.0,0.0,1.0)), power );',
		'	// set gl_Position',
		'	gl_Position	= projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
		'}',
	].join('\n')
	var fragmentShader	= [
		'uniform vec3	glowColor;',

		'varying float	intensity;',

		'void main(){',
		'	gl_FragColor	= vec4(glowColor*intensity, intensity);',
		// '	gl_FragColor	= vec4(glowColor, intensity);',
		'}',
	].join('\n')

	// create custom material from the shader code above
	//   that is within specially labeled script tags
	var material	= new THREE.ShaderMaterial({
		uniforms: { 
			coeficient	: {
				type	: "f", 
				value	: 1.0
			},
			power		: {
				type	: "f",
				value	: 2
			},
			glowColor	: {
				type	: "c",
				value	: new THREE.Color('pink')
			},
		},
		vertexShader	: vertexShader,
		fragmentShader	: fragmentShader,
		// side		: THREE.FrontSide,
		blending	: THREE.AdditiveBlending,
		transparent	: true,
		depthWrite	: false,
	});
	return material
}