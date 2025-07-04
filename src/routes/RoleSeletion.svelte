<script>
	import { AngleDownSolid } from 'svelte-awesome-icons';
	let roleList = $state(null);

	$effect(() => {
		const selectionRole = document.getElementById('selectionRole');
		roleList = document.getElementById('roleList');

		selectionRole.addEventListener('mouseleave', () => {
			roleList.classList.add('hidden');
		});

		setValueOfCheckedRole();
	});

	function toggleRolePopup() {
		roleList.classList.toggle('hidden');
	}

	function setValueOfCheckedRole() {
		const roleSelectedValue = document.querySelector('input[name="role"]:checked').value;
		const p = document.querySelector('#selectionRole p');
		p.innerText = roleSelectedValue;

		// highlight the selected role on the popup
		const allRoleOptionsButtons = roleList.querySelectorAll('button');
		const selectBgColor = 'bg-primary_red/10';
		const selectColor = 'text-primary_red';

		allRoleOptionsButtons.forEach((btn) => {
			if (btn.id == roleSelectedValue) btn.classList.add(selectColor, selectBgColor);
			else btn.classList.remove(selectColor, selectBgColor);
		});
	}

	function selectRole(e, role) {
		// select radio role
		document
			.querySelectorAll('input[name="role"]')
			.forEach((input) => (input.checked = input.value === role));

		// show the selected role
		setValueOfCheckedRole();

		// hide role popup
		toggleRolePopup();
	}
</script>

<div class="relative" id="selectionRole">
	<button
		type="button"
		class="flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
		onclick={toggleRolePopup}
	>
		<p id="selectedRole">Student</p>
		<AngleDownSolid size="14" />
	</button>
	<!-- role options list -->
	<ul
		id="roleList"
		class="*:hover:bg-primary_red absolute inset-x-0 z-10 hidden rounded-sm border border-gray-300 bg-white shadow-md *:cursor-pointer *:hover:text-white"
	>
		<li>
			<button
				id="Student"
				class="w-full px-2 py-1 text-left"
				onclick={(event) => {
					selectRole(event, 'Student');
				}}
				type="button">Student</button
			>
		</li>
		<li>
			<button
				id="Staff"
				class="w-full px-2 py-1 text-left"
				onclick={() => {
					selectRole(event, 'Staff');
				}}
				type="button">Staff</button
			>
		</li>
		<li>
			<button
				id="Faculty"
				class="w-full px-2 py-1 text-left"
				onclick={() => {
					selectRole(event, 'Faculty');
				}}
				type="button">Faculty</button
			>
		</li>
	</ul>
	<!-- actual options input -->
	<div class="hidden">
		<input type="radio" name="role" value="Student" checked />
		<input type="radio" name="role" value="Staff" />
		<input type="radio" name="role" value="Faculty" />
	</div>
</div>
