<template>
	<div class=" h-screen w-screen flex flex-col">
		<!-- Contenedor superior -->
		<div class="max-h-auto flex border-b mx-5 border-slate-700">
			<!-- Contenedor izquierdo superior -->
			<div class="w-1/2 flex items-center ml-6">
				<button class="text-black font-bold text-base p-4"> atrás</button>
				<p class="text-black font-bold text-3xl p-4">Pago de propinas</p>
			</div>

			<!-- Contenedor derecho superior -->
			<div class="w-1/2 flex flex-col items-end justify-center m-4">
				<p class="text-orange-500 text-lg font-bold">Efectivo en caja</p>
				<div class="bg-orange-200 rounded-lg p-2 pl-5">
					<p class="text-orange-500 font-bold text-4xl">$5,500.00</p>
				</div>
			</div>
		</div>

		<!-- Contenedor medio -->
		<div class="flex-1 flex">
			<!-- Contenedor izquierdo del medio -->
			<div class="w-1/3 flex flex-col">
				<!-- Contenido superior izquierdo del medio -->
				<div class="h-1/2 flex flex-col justify-between p-5">

					<!-- Sección de Total de Propinas -->
					<div class="m-4 p-4 flex justify-center items-center">
						<div>
							<p class="text-orange-500 font-bold text-sm">Total de Propinas</p>
							<div class="flex items-center justify-center">
								<div class="bg-transparent ">
									<input v-model="tippingData.totalAmount" @input="captureTipping" :readonly="!editandoTotalAmount"
										type="number"
										class="bg-orange-200 rounded-lg p-2 pl-3 pr-2 text-orange-500 font-bold text-4xl w-4/5" />
								</div>
								<button class="p-2" @click="toggleEdicionTotalAmount"> ✏️ </button>
							</div>
						</div>
					</div>
					<div class="flex flex-col h-1/2 items-center">
						<span class="text-lg font-bold">¿Entre cuántos quieres dividir las Propinas?</span>
						<div class="flex">
							<input type="number" v-model="employees" @input="divideTipping" class="border rounded-lg p-2 mr-2"
								placeholder="#" />
							<p class="text-orange-500 font-bold">${{ payPerPerson || 0 }} x Persona</p>
						</div>
					</div>
				</div>
				<!-- Contenido inferior izquierdo del medio -->
				<div class="flex flex-col items-center justify-center">
					<p class="text-2xl font-bold text-black p-4">🪙 Elige el Método de Pago</p>
					<div class="flex flex-wrap">
						<div v-for="(method, index) in methods" :key="index" @click="methodPayment(method, index)"
							:class="{ 'bg-orange-500': selectedMethod === index }"
							class="cursor-pointer rounded p-2 flex flex-col items-center max-w-28 shadow-xl mb-2 w-1/2">
							<span class="text-4xl flex flex-col">{{ method.icon }}</span>
							<span class="text-xs pt-2 font-bold"> {{ method.label }} </span>
						</div>
					</div>
				</div>
			</div>

			<!-- Contenedor centro del medio -->
			<div class="w-1/3 p-4 ">
				<!-- Contenido centro del medio -->
				<div v-if="Number(numberPad)" class="mx-auto border border-orange-500 rounded-3xl flex-col p-3">
					<!-- Campo de entrada -->
					<div class="flex">
						<input v-model="numberPad" class="text-5xl w-full m-1 p-4 text-end border rounded-lg" readonly />
						<button @click="removeLastDigit" class="p-4 text-3xl text-white font-bold rounded-lg cursor-pointer">
							⬅️
						</button>
					</div>
					<!-- Teclado numérico -->
					<div class="grid justify-center align-middle text-center grid-cols-3 gap-2 p-5">
						<button v-for="number in numbers" :key="number" @click="addNumber(number)"
							class="p-4 text-5xl font-bold border border-black rounded-lg cursor-pointer">
							{{ number }}
						</button>
						<button
							class="text-3xl p-2 bg-orange-500 text-white font-bold rounded-lg cursor-pointer">
							ADD
						</button>
					</div>
					<div v-if="calcRemaining()" class="align-middle text-center">
						<span class="flex flex-col font-bold py-2 border border-orange-500 text-orange-500 rounded-lg "> Cantidad
							Restante ${{ calcRemaining() }}</span>
					</div>
				</div>
				<div v-else class="mx-auto border border-gray-500 bg-gray-300 rounded-3xl flex-col p-3">
					<!-- Campo de entrada -->
					<div class="flex">
						<input v-model="numberPad" class="text-5xl w-full m-1 p-4 text-end border rounded-lg" readonly />
						<button @click="removeLastDigit" class="p-4 text-3xl text-white font-bold rounded-lg cursor-pointer">
							⬅️
						</button>
					</div>
					<!-- Teclado numérico -->
					<div class="grid justify-center align-middle text-center grid-cols-3 gap-2 p-5">
						<button v-for="number in numbers" :key="number" @click="addNumber(number)"
							class="p-4 text-5xl font-bold border border-black rounded-lg cursor-pointer">
							{{ number }}
						</button>
						<button
							class="text-3xl p-2 bg-gray-500 text-white font-bold rounded-lg cursor-pointer">
							ADD
						</button>
					</div>
					<div v-if="calcRemaining()" class="align-middle text-center">
						<span class="flex flex-col font-bold py-2 border border-orange-500 text-orange-500 rounded-lg "> Cantidad
							Restante ${{ calcRemaining() }}</span>
					</div>
				</div>
			</div>

			<!-- Contenedor derecho del medio -->
			<div class="w-1/3">
				<!-- Contenido derecho del medio -->
				<p class="text-black font-bold text-2xl p-4">Pagos</p>
				<div v-for="(payment, index) in tippingData.payments" :key="index"
					class="cursor-pointer mb-2 w-5/6 border border-gray-200 space-y-10 rounded-2xl p-3 flex items-center mx-auto shadow-xl">
					<div class="flex justify-between items-center w-full">
						<span class="text-lg font-bold ml-3"> {{ payment.method }}</span>
						<div class="flex items-center">
							<span class="text-xl mr-2 font-bold">$ {{ payment.amount }}</span>
							<span class="text-sm text-red-700 ml-2">X</span>
						</div>
					</div>
				</div>
			</div>
		</div>


		<!-- Contenedor inferior -->
		<div class="h-1/3 mx-12 flex">
			<!-- Contenedor izquierdo inferior -->
			<div class="w-1/2 mr-12 place-self-center flex flex-col">
				<!-- Contenido izquierdo inferior -->
				<div class="flex justify-between items-start w-full text-3xl">
					<div class="flex items-start">
						<span class="text-orange-500 font-bold">Total Pagado</span>
					</div>
					<div class="flex items-end">
						<span class="text-orange-500 font-bold">${{ calcTotalPaid() }}</span>
					</div>
				</div>
				<div class="flex justify-between items-start w-full text-3xl">
					<div class="flex items-start">
						<span class="text-black font-bold">Restante por Pagar</span>
					</div>
					<div class="flex items-end">
						<span class="text-black font-bold">${{ calcRemaining() }}</span>
					</div>
				</div>
			</div>

			<!-- Contenedor derecho inferior -->
			<div class="w-1/2 flex flex-col text-center align-middle justify-center">
				<button v-if="Number(numberPad)" @click="recordPayment"
					class="p-4 text-3xl bg-orange-500 text-white font-semibold rounded-3xl cursor-pointer">
					Pagar ${{ Number(numberPad) }} en Propinas
				</button>
				<button v-else class="p-4 text-3xl bg-transparent text-gray-400 border border-gray-500 font-semibold rounded-3xl cursor-pointer">
					Pagar Propinas
				</button>
			</div>
		</div>


	</div>
</template>
  
<script>
import axios from 'axios';

export default {
	data() {
		return {
			editandoTotalAmount: false,
			selectedMethod: null,
			tippingData: {
				totalAmount: 0,
				paymentMethod: "",
				payments: [],
			},
			employees: 0,
			payPerPerson: 0.00,
			methods: [
				{ icon: '💵', label: 'Efectivo', name: 'efectivo' },
				{ icon: '💳', label: 'BBVA 1234', name: 'bbva' },
				{ icon: '💳', label: 'Santander 1234', name: 'santander' }
			],
			numberPad: [],
			numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
			remaining: 0,
			selectedSection: null,
		};
	},
	methods: {
		captureTipping() {
			const endpoint = 'http://localhost:3000/api/tipping/capture';
			const payload = { totalAmount: this.tippingData.totalAmount };

			axios.post(endpoint, payload).then(response => {
				console.log(response.data);
			}).catch(error => {
				console.error(error);
			});
		},
		divideTipping() {
			const endpoint = 'http://localhost:3000/api/tipping/divide';
			const payload = { numberOfEmployees: this.employees };

			axios.post(endpoint, payload).then(response => {
				console.log(response.data);
				this.payPerPerson = response.data.tipsPerEmployee
			}).catch(error => {
				this.payPerPerson = 0
				console.error(error);
			});
		},
		recordPayment() {
			const endpoint = 'http://localhost:3000/api/tipping/recordPayment';
			const payload = { method: this.tippingData.paymentMethod, amount: Number(this.numberPad) };
			console.log(payload);
			axios.post(endpoint, payload).then(response => {
				console.log(response.data);
				alert("Se ha creado el pago de la propina exitosamente !");
			}).catch(error => {
				console.error(error);
				alert("No se ha podido crear el pago de propina !");
			}).finally(() => {
				this.getTippingPayments()
			});
			console.log('Propina agregada');
			this.numberPad = []; // Limpiamos el input
		},
		getTippingPayments() {
			const endpoint = 'http://localhost:3000/api/tipping/tippingPayments';

			axios.get(endpoint)
				.then(response => {
					this.tippingData.totalAmount = response.data.totalAmount;
					this.tippingData.payments = response.data.payments;
				}).catch(error => {
					console.error(error);
					alert("Algo ha salido mal !");
				})
				.finally(() => {
					this.numberPad = []; // Limpiamos el input
				});
		},
		methodPayment(method, index) {
			this.selectedMethod = index;
			this.tippingData.paymentMethod = method.name;
		},
		toggleEdicionTotalAmount() {
			this.editandoTotalAmount = !this.editandoTotalAmount;
		},
		addNumber(number) {
			this.numberPad += number;
		},
		removeLastDigit() {
			this.numberPad = this.numberPad.slice(0, -1);
		},
		calcTotalPaid() {
			// Lógica para calcular el total pagado sumando los amounts de los payments
			return this.tippingData.payments.reduce((total, payment) => total + payment.amount, 0);
		},
		calcRemaining() {
			// Lógica para calcular el restante por pagar restando el total de propinas del total pagado
			return this.tippingData.totalAmount - this.calcTotalPaid();
		},
	},
};
</script>
  