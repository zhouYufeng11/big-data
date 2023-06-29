<template>
	<div class="con-table">
		<div class="table-box-header">
			<table align="center" vertical="center" border="0" cellspacing="0" cellpadding="0">
				<colgroup>
					<col v-for="(t, s) in head" :key="'head_col_head_' + s" :width="t.width" />
				</colgroup>
				<thead>
					<tr>
						<th v-for="(h, i) in head" :key="'head_' + i">{{ h.text }}</th>
					</tr>
				</thead>
			</table>
		</div>
		<div class="table-box-body">
			<table align="center" vertical="center" border="0" cellspacing="0" cellpadding="0">
				<colgroup>
					<col v-for="(t, s) in head" :key="'head_col_body_' + s" :width="t.width" />
				</colgroup>
				<tbody>
					<tr v-for="(v, k) in list" :key="'list_' + k">
						<td>{{ k + 1 }}</td>
						<td>{{ v.name }}</td>
						<td>{{ v.project }}</td>
						<td>{{ v.money }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
// import { ref, onMounted, computed } from 'vue';

const props = defineProps({
	head: {
		type: Array<{ text: string, width: number }>,
		default: []
	},
	list: {
		type: Array<{ name: string, project: string, money: string }>,
		default: []
	},
})

</script>

<style lang="scss" scoped>
.con-table {
	width: 100%;
	.table-box-body {
		max-height: 150px;
		overflow: auto;

		table {
			animation: scrollBot 15s linear infinite;

			&:hover {
				animation-play-state: paused;
			}
		}
	}


	table {
		width: 100%;
		text-align: center;
		word-wrap: break-word;
		word-break: break-all;
		table-layout: fixed;
		border-collapse: separate;

		tr {
			th {
				color: #fff;
			}
		}

		td,
		th {
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			vertical-align: middle !important;
		}

		tbody {
			tr {
				&:nth-child(2n) {
					background: rgba(52, 112, 214, 0.2);
				}
			}
		}

		tr td {
			color: #fff;

			&.danger {
				color: #eb9682;
			}

			&.warning {
				color: #ddcb9d;
			}

			&.success {
				color: #61d893;
			}
		}

	}
}

@keyframes scrollBot {
	0% {
		transform: translateY(0)
	}

	to {
		transform: translateY(-60%)
	}
}
</style>