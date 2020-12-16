package github.ryantaplin.ti.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactIndexController {

	@RequestMapping(value = "/*")
	public String index() {
		return "index";
	}

}