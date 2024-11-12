document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton');
    const confirmSubmitButton = document.getElementById('confirmSubmit');
    const cancelButton = document.getElementById('cancelButton');
    const submitModal = document.getElementById('submitModal');

    const codeOption = document.getElementById('codeOption');
    const fileOption = document.getElementById('fileOption');
    const codeSection = document.getElementById('codeSection');
    const fileSection = document.getElementById('fileSection');

    // show modal
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        submitModal.classList.remove('hidden');
    });

    // click cancel button and hide modal
    cancelButton.addEventListener('click', function() {
        submitModal.classList.add('hidden');
    });

    // select code option
    codeOption.addEventListener('click', function() {
        codeSection.classList.remove('hidden');
        fileSection.classList.add('hidden');
        codeOption.classList.add('border-b-2', 'border-blue-600', 'text-blue-600', 'font-semibold');
        fileOption.classList.remove('border-b-2', 'border-blue-600', 'text-blue-600', 'font-semibold');
        fileOption.classList.add('text-gray-600');
    });

    // select file option
    fileOption.addEventListener('click', function() {
        fileSection.classList.remove('hidden');
        codeSection.classList.add('hidden');
        fileOption.classList.add('border-b-2', 'border-blue-600', 'text-blue-600', 'font-semibold');
        codeOption.classList.remove('border-b-2', 'border-blue-600', 'text-blue-600', 'font-semibold');
        codeOption.classList.add('text-gray-600');
    });

    // 確認提交操作
    confirmSubmitButton.addEventListener('click', async function() {
        const problemId = "1";
        const submitUrl = `/problem/${problemId}/submit`;

        const formData = new FormData();
        // submit the data of code field
        if (!codeSection.classList.contains('hidden')) {
            const language = document.getElementById('languageCode').value;
            const code = document.getElementById('codeInput').value;

            formData.append('type', 'code');
            formData.append('language', language);
            formData.append('code', code);
        }
        else if (!fileSection.classList.contains('hidden')) {
            const language = document.getElementById('languageCode').value;
            const file = document.getElementById('fileInput').files[0];

            formData.append('type', 'file');
            formData.append('language', language);
            formData.append('content', file);
        }

        // Post to submitUrl
        try {
            const response = await fetch(submitUrl, {
                method: 'POST',
                body: formData
            });

            const result = response.json();
            if (result.success) {
                alert("提交成功！");
                submitModal.classList.add('hidden');
            } else {
                console.log(result);
                alert("提交失敗：" + result.msg);
            }
        } catch (error) {
            console.error("提交錯誤:", error);
            alert("提交失敗，請稍後再試！");
        }
    });
});