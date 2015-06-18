require.config({
    baseUrl: 'js',
    paths: {
        zepto: 'lib/zepto.min',
		avartar: 'app/avatar',
		avatarCfg: 'app/avatarCfg',
		tracker: 'app/tracker'
    },
	shim:{
		'zepto' : {
			'exports' : 'zepto'	
		},
		'avatarCfg' : {
			'exports' : 'avatarCfg',
			'deps' : ['tracker']
		},
		'avatar' : {
			'exports' : 'avatar',
			'deps' : ['avatarCfg']
		}
	}
});

require(['app/detail','app/avatar']);