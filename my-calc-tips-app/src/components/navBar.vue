<!-- src/components/NavigationBar.vue -->
<template>
	<div class="h-screen w-min flex bg-gray-800">
		<aside class="flex flex-col items-center md:justify-between space-y-1 bg-white shadow">
			<!-- Side Nav Bar-->
			<div class="my-6 flex">
				<a class="w-16 h-16 mx-auto">
					<img class="w-12 mx-auto" src="/vite.svg" alt="bussines logo" />
				</a>
			</div>

			<!-- Iconos de apartados -->
			<div class="flex flex-col space-y-3">
				<div v-for="(section, index) in sections" :key="index" @click="selectSection(index)"
					:class="{ 'bg-orange-500': selectedSection === index }"
					class="cursor-pointer rounded p-2 flex items-center mx-auto">
					<span class="text-lg">{{ section.icon }}</span>
				</div>
			</div>

			<!-- ... Resto de los elementos -->
			<div class="mt-auto mb-6 space-y-2 flex flex-col items-center h-max">
				<div class="flex items-center cursor-pointer rounded p-2 mx-auto">
					<span class="text-lg">🌙</span>
				</div>
				<div class="flex items-center cursor-pointer rounded p-2 mx-auto">
					<span class="text-lg">⚙️</span>
				</div>
				<div class="flex items-center cursor-pointer rounded p-2 mx-auto">
					<svg class="h-5 w-5 text-red-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
						<polyline points="16 17 21 12 16 7"></polyline>
						<line x1="21" y1="12" x2="9" y2="12"></line>
					</svg>
				</div>
			</div>
		</aside>
	</div>
</template>

<script>
export default {
	data() {
		return {
			sections: [
				{ icon: '🏠', name: 'Inicio' },
				{ icon: '📊', name: 'Estadísticas' },
				{ icon: '📋', name: 'Registros' },
				{ icon: '📋', name: 'Registros' },
				{ icon: '📋', name: 'Registros' },
				{ icon: '📋', name: 'Registros' },
				{ icon: '📋', name: 'Registros' },
				{ icon: '📋', name: 'Registros' },
				{ icon: '📋', name: 'Registros' },
				{ icon: '📋', name: 'Registros' },
				// ... Agrega más secciones según tus necesidades
			],
			selectedSection: 1,
		};
	},
	methods: {
		selectSection(index) {
			this.selectedSection = index;
			// Agrega lógica adicional al seleccionar una sección
		},
	},
};
</script>
