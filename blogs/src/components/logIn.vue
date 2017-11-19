<template>
    <div class="load">
        <ul id="from">
            <li>
                <h4 id="pleaselogin">个人博客</h4>
            </li>
            <li v-focus="name">
                <input type="text" id="user" placeholder="请输入用户名" v-model.lazy="name.value" @blur="requiredState(name)">
            </li>
            <li v-focus="pw">
                <input type="password" id="psw" placeholder="请输入密码" v-model.lazy="pw.value" @blur="requiredState(pw)">
            </li>
            <el-button type="success" id="log" @click="login()">登陆</el-button>
        </ul>
        <!-- <el-button :plain="true" @click="open2">成功</el-button> -->
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            name: {
                value: "",
                reg: /^[a-zA-Z]{4,10}$/,
                msg: "您输入的姓名格式不正确",
                required: true,
                focuestate: false,
                state: false
            },
            pw: {
                value: "",
                reg: /^[a-zA-Z0-9]{5,17}$/,
                msg: "您输入的密码格式不正确",
                required: true,
                focuestate: false,
                state: false
            }
        }
    },
    methods: {
        requiredState(data) {
            data.focuestate = true;
        },
        login() {
            if (this.name.value != "" && this.pw.value != "" && this.name.state && this.pw.state) {
                this.axios.post("/api/back_class", {
                    loginname: this.name.value,
                    loginpw: this.pw.value
                }).then((data) => {
                    if (data.data.code == "1001") {
                        this.$message({
                            message: "恭喜你，登陆成功",
                            type: 'success'
                        })
                        this.$router.push('/main');
                        var ss = window.sessionStorage;
                        ss.setItem("loginname", this.name.value)
                        ss.setItem("loginpw", this.pw.value)
                    } else if (data.data.code == "1003") {
                        this.$message.error("用户名不存在")
                        // this.$router.go(0)
                    }else{
                         this.$message.error("密码不正确")
                    }
                })
            }

        }
    },
    directives: {
        focus: {
            componentUpdated(el, binding) {
                let clearP = () => {
                    let $p = el.getElementsByTagName("p")[0];
                    if ($p !== undefined) {
                        el.removeChild($p);
                    }
                }
                let test = () => {
                    clearP();
                    if (binding.value.value !== "") {
                        if (!binding.value.reg.test(binding.value.value)) {
                            let $p = document.createElement("p");
                            $p.innerHTML = binding.value.msg;
                            $p.style.color = "red";
                            el.appendChild($p);
                            binding.value.state = false;
                        } else {
                            binding.value.state = true;

                        }
                    }
                }
                //必须项验证代码
                let requiredFn = () => {
                    console.log(binding)
                    if (binding.value.value === "") {
                        console.log("33333")
                        clearP();
                        if (binding.value.focuestate) {
                            let $p = document.createElement("p");
                            $p.innerHTML = "不能为空";
                            $p.style.color = "red";
                            el.appendChild($p);
                        } else {
                            test();
                        }
                    }
                }
                requiredFn();
                test();
            }
        }
    }
}

</script>

<style>
#from {
    width: 400px;
    height: 300px;
    border: 1px solid orangered;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
}

h4 {
    font-weight: normal;
    text-align: center;
    font-size: 24px;
    padding: 10px 0;
    margin: 0;
    color: orangered;
}

input {
    width: 80%;
    height: 40px;
    display: block;
    margin: 0 auto;
    border-radius: 15px;
    border: none;
    box-sizing: border-box;
    padding: 0 10px;
    outline: none;
    border: 1px solid #ccc;
}

li {
    list-style: none;
    margin-bottom: 20px;
}

#log {
    width: 80%;
    display: block;
    margin: 20px auto;
    background: orangered;
    border: 0;
    outline: none;
}

#pleaselogin {
    padding: 20px 0;
}

p {
    text-align: center;
}
</style>