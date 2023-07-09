//screen check
if (window.innerWidth < 610) {
    document.getElementsByTagName("body")[0].innerText = "Please open in bigger screen"
    document.getElementsByTagName("body")[0].style.display = "flex";
}
let arr = [];
let len = 100;
generateArr();
function generateArr() {
    let val = parseInt(document.getElementById("size").value);
    if (!isNaN(val) && val < 201 && val > 4) len = val;
    arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(Math.floor(Math.random() * 800));
    }
    generateBar();
}
function generateBar() {
    let p = "";
    arr.map(val => {
        p += `<div class="bar" id="bar-${val}" style="height:${val / 2}px;"></div>`
    })
    document.getElementsByClassName("canvas")[0].innerHTML = p;
}
function sleep() {
    generateBar();
    return new Promise(resolve => setTimeout(resolve, 0.05));
}
function sort() {
    let e = document.getElementById("sort").selectedIndex;
    switch (e) {
        case 0:
            bubbleSort();
            break;
        case 1:
            selectionSort();
            break;
        case 2:
            insertionSort();
            break;
        case 3:
            mergeSortC();
            break;
        case 4:
            quickSort();
            break;
        case 5:
            radixSort();
            break;
        default:
            break;
    }
}
async function bubbleSort() {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

            }
            // await sleep();
        }
        await sleep();
    }

}
async function selectionSort() {
    let i, j, min_idx;
    let n = arr.length;
    for (i = 0; i < n - 1; i++) {
        min_idx = i;
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
            // await sleep();
        }
        await sleep();
        [arr[min_idx], arr[i]] = [arr[i], arr[min_idx]]
    }
}
async function insertionSort() {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let current = arr[i];
        let j = i - 1;
        while ((j > -1) && (current < arr[j])) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
        await sleep();
    }
}
//mergesort
async function merge(arr, l, m, r) {
    var n1 = m - l + 1;
    var n2 = r - m;

    // Create temp arrays
    var L = new Array(n1);
    var R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    // Merge the temp arrays back leto arr[l..r]

    // Initial index of first subarray
    var i = 0;

    // Initial index of second subarray
    var j = 0;

    // Initial index of merged subarray
    var k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
        await sleep();
    }
    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
        await sleep();
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
        await sleep();
    }
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted
async function mergeSortC() {
    await mergeSort(arr, 0, arr.length - 1);
}
async function mergeSort(arr, l, r) {
    if (l >= r) {
        return;
    }
    var m = l + parseInt((r - l) / 2);
    await mergeSort(arr, l, m);
    await sleep();
    await mergeSort(arr, m + 1, r);
    await sleep();
    await merge(arr, l, m, r);
}
onkeydown = (e) => { if (e.key == "Enter") generateArr() }

//quicksort
async function quickSort(){
    await qsort(arr,0,arr.length-1)
}
async function partition(arr,low,high){
        let pivot = arr[high];
        let i = (low-1); // index of smaller element
        for (let j=low; j<high; j++)
        {
            // If current element is smaller than or
            // equal to pivot
            if (arr[j] <= pivot)
            {
                i++;
                // swap arr[i] and arr[j]
                [arr[i],arr[j]]=[arr[j],arr[i]]
            }
            await sleep();
        }
        // swap arr[i+1] and arr[high] (or pivot)
        [arr[i+1],arr[high]]=[arr[high],arr[i+1]]
        return i+1;
}
async function qsort(arr,low, high){
        if (low < high)
        {
            let pi = await partition(arr, low, high);

            await qsort(arr, low, pi-1);
            await sleep();
            await qsort(arr, pi+1, high);
            await sleep();
        }
}

//radix sort
function getDigit(num, pos) {
    return Math.floor(Math.abs(num) / Math.pow(10, pos)) % 10;
  }
  
  // Function to get the number of digits in the largest number
  function digitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
  }
  
  // Function to get the number of digits in the largest number in an array
  function mostDigits() {
    let maxDigits = 0;
    for (let i = 0; i < arr.length; i++) {
      maxDigits = Math.max(maxDigits, digitCount(arr[i]));
    }
    return maxDigits;
  }
  
  // Radix Sort function
  async function radixSort() {
    const maxDigits = mostDigits();
  
    for (let k = 0; k < maxDigits; k++) {
      const buckets = Array.from({ length: 10 }, () => []);
  
      for (let i = 0; i < arr.length; i++) {
        const digit = getDigit(arr[i], k);
        buckets[digit].push(arr[i]);
        await sleep();
      }
      arr = [].concat(...buckets);
      await sleep();
    }
  }