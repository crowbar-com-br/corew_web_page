export default {
	items: [
		{
			name: 'Dashboard',
			url: '/dashboard',
			icon: 'fa fa-dashboard',
		},
		{
			title: true,
			name: 'Corew',
			wrapper: {            // optional wrapper object
				element: '',        // required valid HTML5 element tag
				attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
			},
			class: ''             // optional class names space delimited list for title item ex: "text-center"
		},
		{
			name: 'Micro Serviços',
			url: '/ms',
			icon: 'fa fa-server',
			children: [
				{
					name: 'API Gateway',
					url: '/ms/api_gateway',
					icon: 'fa fa-map-signs',
				},
				{
					name: 'REST API',
					url: '#',
					icon: 'fa fa-book',
				},
				{
					name: 'Authentication',
					url: '#',
					icon: 'fa fa-lock',
				},
				{
					name: 'Web Page',
					url: '#',
					icon: 'fa fa-globe',
				},
			]
		},
		{
			name: 'Gerenciar Micro Serviços',
			url: '/ms',
			icon: 'fa fa-cog',
		},
	],
};
