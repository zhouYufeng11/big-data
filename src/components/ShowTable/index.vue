<template>
	<div class="con-table">
		<div class="table-box-header">
			<table align="center" vertical="center" border="0" cellspacing="0" cellpadding="0">
				<colgroup>
					<col v-for="(t, s) in head" :key="'head_col_head_' + height + s" :width="t.width" />
				</colgroup>
				<thead>
					<tr>
						<th v-for="(h, i) in head" :key="'head_' + height + i">{{ h.text }}</th>
					</tr>
				</thead>
			</table>
		</div>
		<div class="table-box-body" :style="{ minHeight: height - 36 + 'px' }">
			<table align="center" vertical="center" border="0" cellspacing="0" cellpadding="0">
				<colgroup>
					<col v-for="(t, s) in head" :key="'head_col_body_' + height + s" :width="t.width" />
				</colgroup>
				<tbody>
					<tr v-for="(v, k) in list" :key="'list_' + height + k">
						<td>
							<p class="type">{{ showType(v.type) }}</p>
						</td>
						<td>{{ v.content }}</td>
						<td>{{ v.time }}</td>
						<td>{{ v.name }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
	head: {
		type: Array<{ text: string, width: number }>,
		default: []
	},
	list: {
		type: Array<{ name: string, content: string, time: string, type: number }>,
		default: []
	},
	height: {
		type: Number,
		default: 218
	}
})

const tableHeight = props.height - 20 + 'px';

const showType: any = computed(() => {
	return (type: number) => {
		if (type === 1) {
			return '未成年'
		} else if (type === 2) {
			return '失踪人口'
		} else if (type === 3) {
			return '电信诈骗'
		} else if (type === 4) {
			return '入室抢劫'
		} else {
			return '暂时未知'
		}
	}
});

</script>

<style lang="scss" scoped>
.con-table {
	margin: 10px 30px 0 30px;
	// border: 1px solid #00bbfa;
	// border-radius: 6px;
	height: v-bind(tableHeight);
	overflow: hidden;

	.table-box-body {
		overflow: auto;

		table {
			animation: scrollBot 20s linear infinite;

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
		border: 0.6px solid #00366b;

		tr {
			th {
				color: #6CAEFF;
			}
		}

		td,
		th {
			height: 36px;
			line-height: 36px;
			font-size: 14px;
			vertical-align: middle !important;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		tbody {
			tr {
				height: 40px;
				line-height: 40px;

				&:nth-child(2n) {
					background: rgba(52, 112, 214, 0.2);
				}
			}
		}

		tr td {
			color: #fff;

			.type {
				margin: 0 auto;
				height: 22px;
				line-height: 22px;
				background: url('../../assets/images/type.png') center / contain no-repeat;
			}

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
		transform: translateY(-80%)
	}
}
</style>