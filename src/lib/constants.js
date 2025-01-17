function define(name, value) {
	Object.defineProperty(exports, name, {
		value: value,
		enumerable: true
	});
}

define('STATES', [
	'Pedido',
	'Confirmado',
	'Enviado',
	'Completo',
	'Cancelado'
]);


define('DEPARTMENTS', [
	'Amazonas',
	'Áncash',
	'Apurímac',
	'Arequipa',
	'Ayacucho',
	'Cajamarca',
	'Callao',
	'Cuzco',
	'Huancavelica',
	'Huánuco',
	'Ica',
	'Junín',
	'La Libertad',
	'Lambayeque',
	'Lima',
	'Loreto',
	'Madre de Dios',
	'Moquegua',
	'Pasco',
	'Piura',
	'Puno',
	'San Martín',
	'Tacna',
	'Tumbes',
	'Ucayali'
]);

define('DISTRICTS', [
	'Ancon',
	'Ate',
	'Barranco',
	'Breña',
	'Carabayllo',
	'Chaclacayo',
	'Chorillos',
	'Cieneguilla',
	'Comas',
	'El agustino',
	'Indenpendencia',
	'Jesus maria',
	'La molina',
	'La victoria',
	'Lima',
	'Lince',
	'Los olivos',
	'Lurigancho',
	'Lurin',
	'Magdalena del mar',
	'Magdalena vieja',
	'Miraflores',
	'Pachacamac',
	'Pucusana',
	'Pueblo libre',
	'Puente piedra',
	'Punta negra',
	'Punta hermosa',
	'Rimac',
	'S. juan de lurigancho',
	'S. juan de miraflores',
	'San bartolo',
	'San borja',
	'San isidro',
	'San luis',
	'San martin de porres',
	'San miguel',
	'Santa anita',
	'Santa maria del mar',
	'Santa rosa',
	'Santiago de surco',
	'Surquillo',
	'Villa el salvador',
	'Villa maria del triunfo'
])