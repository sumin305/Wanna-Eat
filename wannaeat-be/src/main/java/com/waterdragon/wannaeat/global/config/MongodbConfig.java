package com.waterdragon.wannaeat.global.config;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;

@Configuration
public class MongodbConfig implements InitializingBean {

	@Autowired
	private MappingMongoConverter mappingMongoConverter;

	@Override
	public void afterPropertiesSet() throws Exception {
		mappingMongoConverter.setTypeMapper(new DefaultMongoTypeMapper(null));
	}
}
